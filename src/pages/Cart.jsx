import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])

  useEffect(() => {
    const raw = localStorage.getItem('cart')
    setCart(raw ? JSON.parse(raw) : [])
  }, [])

  const persist = (next) => {
    setCart(next)
    localStorage.setItem('cart', JSON.stringify(next))
  }

  const updateQuantity = (index, qty) => {
    const next = [...cart]
    next[index].quantity = Math.max(1, Number(qty) || 1)
    next[index].total = Number((next[index].unitPrice * next[index].quantity).toFixed(2))
    persist(next)
  }

  const removeItem = (index) => {
    const next = cart.filter((_, i) => i !== index)
    persist(next)
  }

  const clearCart = () => {
    persist([])
  }

  const subtotal = cart.reduce((s, item) => s + Number(item.total || item.unitPrice * item.quantity || 0), 0)
  const shipping = subtotal > 0 ? 49 : 0
  const total = Number((subtotal + shipping).toFixed(2))

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty')
      return
    }
    // Replace with real checkout flow / route
    navigate('/checkout') // ensure route exists in the app
  }

  return (
    <div className="max-w-6xl mx-auto pt-24 mt-4 px-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-pink-500">Your Cart{cart.length > 0 ? ` (${cart.length})` : ''}</h1>

      {cart.length === 0 ? (
        <div className="py-20 text-center text-gray-600">
          Your cart is empty.
          <div className="mt-4">
            <button
              onClick={() => navigate('/products')}
              className="bg-pink-500 text-white px-4 py-2 rounded"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 ">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
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
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center ">
                      <button
                        onClick={() => updateQuantity(idx, Number(item.quantity) - 1)}
                        className="px-3 py-1"
                      >−</button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(idx, e.target.value)}
                        className="w-16 text-center  px-2 py-1"
                      />
                      <button
                        onClick={() => updateQuantity(idx, Number(item.quantity) + 1)}
                        className="px-3 py-1"
                      >+</button>
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

          {/* Summary */}
          <aside className="p-4  h-fit">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Subtotal</div>
              <div className="font-semibold">₹{subtotal.toLocaleString()}</div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">Shipping</div>
              <div className="font-semibold">₹{shipping.toLocaleString()}</div>
            </div>

            <div className="pt-4 mt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold">Total</div>
                <div className="text-lg font-bold text-pink-600">₹{total.toLocaleString()}</div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-pink-500 text-white py-3 rounded mb-3"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full border border-gray-300 py-2 rounded text-sm"
              >
                Clear Cart
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

export default Cart