import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI, cartAPI } from '../utils/api'

const Cart = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [updatingItemId, setUpdatingItemId] = useState(null)

  useEffect(() => {
    checkAuthAndLoadCart()
  }, [])

  const checkAuthAndLoadCart = async () => {
    const loggedIn = authAPI.isAuthenticated()
    setIsLoggedIn(loggedIn)
    
    if (loggedIn) {
      await loadCartFromAPI()
    } else {
      loadCartFromLocal()
    }
  }

  const loadCartFromLocal = () => {
    const raw = localStorage.getItem('cart')
    setCart(raw ? JSON.parse(raw) : [])
    setLoading(false)
  }

  const loadCartFromAPI = async () => {
    try {
      setLoading(true)
      const apiCart = await cartAPI.getCart()
      // Convert API cart to local format
      const localCart = apiCart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        unitPrice: parseFloat(item.unit_price),
        quantity: item.quantity,
        total: parseFloat(item.subtotal),
        image: item.product.preview || '',
        cartItemId: item.id
      }))
      setCart(localCart)
    } catch (error) {
      console.error('Failed to load cart from API:', error)
      // Fallback to local cart
      loadCartFromLocal()
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (index, qty) => {
    const newQuantity = Math.max(1, Number(qty) || 1)
    const item = cart[index]
    
    // Don't update if quantity hasn't changed
    if (item.quantity === newQuantity) return
    
    if (isLoggedIn) {
      try {
        setUpdatingItemId(item.productId)
        
        // FIX: Since addItem creates new items, we need to:
        // 1. Remove the existing item first
        // 2. Add it again with the new quantity
        
        // First, remove the item from cart
        await cartAPI.removeItem(item.productId)
        
        // Then add it back with the new quantity
        await cartAPI.addItem(item.productId, newQuantity)
        
        // Update local state immediately for better UX
        const updatedCart = [...cart]
        updatedCart[index].quantity = newQuantity
        updatedCart[index].total = Number((updatedCart[index].unitPrice * newQuantity).toFixed(2))
        setCart(updatedCart)
        
        // Reload from API to ensure consistency
        setTimeout(async () => {
          await loadCartFromAPI()
        }, 100)
        
      } catch (error) {
        console.error('Failed to update quantity:', error)
        alert('Failed to update quantity. Please try again.')
        // Reload cart to revert any changes
        await loadCartFromAPI()
      } finally {
        setUpdatingItemId(null)
      }
    } else {
      const next = [...cart]
      next[index].quantity = newQuantity
      next[index].total = Number((next[index].unitPrice * newQuantity).toFixed(2))
      setCart(next)
      localStorage.setItem('cart', JSON.stringify(next))
    }
  }

  // Add a direct update function that doesn't remove/add
  const directUpdateQuantity = async (index, qty) => {
    const newQuantity = Math.max(1, Number(qty) || 1)
    const item = cart[index]
    
    if (item.quantity === newQuantity) return
    
    if (isLoggedIn) {
      try {
        setUpdatingItemId(item.productId)
        
        // Try to update quantity directly with the backend
        // If your backend doesn't support direct updates, it will fail
        const token = authAPI.getToken()
        const response = await fetch(`http://64.227.179.189:8000/api/cart/update-quantity/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            product_id: item.productId,
            quantity: newQuantity
          }),
        })
        
        if (response.ok) {
          // Update local state
          const updatedCart = [...cart]
          updatedCart[index].quantity = newQuantity
          updatedCart[index].total = Number((updatedCart[index].unitPrice * newQuantity).toFixed(2))
          setCart(updatedCart)
          
          // Reload from API
          await loadCartFromAPI()
        } else {
          // If direct update fails, use the remove/add method
          await updateQuantity(index, qty)
        }
        
      } catch (error) {
        console.error('Direct update failed, trying remove/add method:', error)
        // Fallback to remove/add method
        await updateQuantity(index, qty)
      } finally {
        setUpdatingItemId(null)
      }
    } else {
      const next = [...cart]
      next[index].quantity = newQuantity
      next[index].total = Number((next[index].unitPrice * newQuantity).toFixed(2))
      setCart(next)
      localStorage.setItem('cart', JSON.stringify(next))
    }
  }

  const removeItem = async (index) => {
    const item = cart[index]
    
    if (isLoggedIn && item.productId) {
      try {
        await cartAPI.removeItem(item.productId)
        const next = cart.filter((_, i) => i !== index)
        setCart(next)
      } catch (error) {
        console.error('Failed to remove item:', error)
        alert('Failed to remove item. Please try again.')
      }
    } else {
      const next = cart.filter((_, i) => i !== index)
      setCart(next)
      localStorage.setItem('cart', JSON.stringify(next))
    }
  }

  const clearCart = async () => {
    if (isLoggedIn) {
      try {
        // Remove all items one by one from API
        for (const item of cart) {
          await cartAPI.removeItem(item.productId)
        }
        setCart([])
      } catch (error) {
        console.error('Failed to clear cart:', error)
        alert('Failed to clear cart. Please try again.')
      }
    } else {
      setCart([])
      localStorage.removeItem('cart')
    }
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty')
      return
    }
    
    if (!isLoggedIn) {
      alert('Please login to proceed to checkout')
      navigate('/login')
      return
    }
    
    navigate('/cart')
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto pt-24 mt-4 px-4 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12  border-pink-500 mx-auto mb-4"></div>
          <p>Loading cart...</p>
        </div>
      </div>
    )
  }

  const subtotal = cart.reduce((s, item) => s + Number(item.total || item.unitPrice * item.quantity || 0), 0)
  const shipping = subtotal > 0 ? 49 : 0
  const total = Number((subtotal + shipping).toFixed(2))

  const hasLocalCart = !isLoggedIn && localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')).length > 0

  return (
    <div className="max-w-6xl mx-auto pt-24 mt-4 px-4 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-pink-500">
          Your Cart{cart.length > 0 ? ` (${cart.length})` : ''}
        </h1>
        
        {!isLoggedIn && cart.length > 0 && (
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
          >
            Login to Save Cart
          </button>
        )}
      </div>

      {hasLocalCart && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-yellow-800">You have items in your local cart</p>
              <p className="text-sm text-yellow-600 mt-1">
                Login to sync them to your account and access from any device.
              </p>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm"
            >
              Login & Sync
            </button>
          </div>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="py-20 text-center text-gray-600">
          Your cart is empty.
          <div className="mt-4">
            <button
              onClick={() => navigate('/products')}
              className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 ">
                <img
                  src={item.image || 'https://via.placeholder.com/100'}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100x100?text=No+Image'
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sm text-gray-500">₹{Number(item.unitPrice).toLocaleString()}</div>
                    </div>

                    <button
                      onClick={() => removeItem(idx)}
                      className="text-sm text-red-500 hover:underline"
                      disabled={updatingItemId === item.productId}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center border">
                      <button
                        onClick={() => directUpdateQuantity(idx, Number(item.quantity) - 1)}
                        className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                        disabled={item.quantity <= 1 || updatingItemId === item.productId}
                      >
                        −
                      </button>
                      <div className="w-16 text-center border-x px-2 py-1 flex items-center justify-center">
                        {updatingItemId === item.productId ? (
                          <div className="w-4 h-4 border-t-2 border-b-2 border-pink-500 rounded-full animate-spin mx-auto"></div>
                        ) : (
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => directUpdateQuantity(idx, e.target.value)}
                            className="w-full text-center bg-transparent"
                            disabled={updatingItemId === item.productId}
                          />
                        )}
                      </div>
                      <button
                        onClick={() => directUpdateQuantity(idx, Number(item.quantity) + 1)}
                        className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                        disabled={updatingItemId === item.productId}
                      >
                        +
                      </button>
                    </div>

                    <div className="ml-auto text-right">
                      <div className="text-sm text-gray-500">Sub Total</div>
                      <div className="font-semibold">₹{Number(item.total).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="p-6  h-fit">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${isLoggedIn ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <span className="text-sm font-medium">
                  {isLoggedIn ? 'Using Account Cart' : 'Using Local Cart'}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {isLoggedIn 
                  ? 'Your cart is saved to your account' 
                  : 'Your cart is saved locally. Login to save it permanently.'}
              </p>
            </div>

            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Subtotal</div>
              <div className="font-semibold">₹{subtotal.toLocaleString()}</div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">Shipping</div>
              <div className="font-semibold">₹{shipping.toLocaleString()}</div>
            </div>

            <div className="pt-4 mt-4 border-t">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold">Total</div>
                <div className="text-lg font-bold text-pink-600">₹{total.toLocaleString()}</div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg mb-3 transition-colors disabled:opacity-50"
                disabled={cart.length === 0 || updatingItemId !== null}
              >
                {isLoggedIn ? 'Proceed to Checkout' : 'Login to Checkout'}
              </button>

              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
                  disabled={updatingItemId !== null}
                >
                  Clear Cart
                </button>
                
                {!isLoggedIn && (
                  <button
                    onClick={() => navigate('/login')}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm transition-colors"
                    disabled={updatingItemId !== null}
                  >
                    Login to Save
                  </button>
                )}
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

export default Cart