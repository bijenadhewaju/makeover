const API_BASE_URL = 'http://64.227.179.189:8000/api';

// ========== SIMPLE TOKEN FUNCTIONS ==========
const getToken = () => localStorage.getItem('access_token');
const getRefreshToken = () => localStorage.getItem('refresh_token');

const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
};

const clearTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
};

// ========== SIMPLE FETCH ==========
const fetchAPI = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.detail || `Error: ${response.status}`);
  }

  return response.json();
};

// ========== AUTH API ==========
export const authAPI = {
  // SIGNUP
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Signup failed');
    }
    
    return response.json();
  },

  // LOGIN - FIXED VERSION
  login: async (credentials) => {
    console.log('Logging in with:', credentials);
    
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
    console.log('Login response:', data);
    
    if (!response.ok) {
      throw new Error(data.detail || 'Login failed');
    }
    
    // SAVE TOKENS - FIX: Use access_token and refresh_token (with underscore)
    if (data.access_token && data.refresh_token) {
      console.log('Saving tokens to localStorage...');
      setTokens(data.access_token, data.refresh_token);
      
      // Save user data
      if (data.data) {
        localStorage.setItem('user', JSON.stringify(data.data));
        console.log('User saved:', data.data);
      }
    } else {
      console.error('No tokens in response:', data);
      throw new Error('No tokens received');
    }
    
    return data;
  },

  // LOGOUT
  logout: () => {
    clearTokens();
  },

  // GET CURRENT USER
  getCurrentUser: async () => {
    return await fetchAPI('/auth/me/');
  },

  // CHECK IF LOGGED IN
  isAuthenticated: () => {
    return !!getToken();
  },

  // GET USER FROM STORAGE
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// ========== PRODUCT API ==========
export const productAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/products/${query ? `?${query}` : ''}`);
  },

  getBySlug: (slug) => {
    return fetchAPI(`/products/${slug}/`);
  },

  getFlashSales: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/flash-sales/${query ? `?${query}` : ''}`);
  },

  getProductOfTheDay: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/product-of-the-day/${query ? `?${query}` : ''}`);
  },

  getBestSellers: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/best-sellers/${query ? `?${query}` : ''}`);
  },

  getAttractiveOffers: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/attractive-offers/${query ? `?${query}` : ''}`);
  },
};

// ========== CATEGORY API ==========
export const categoryAPI = {
  getAll: () => {
    return fetchAPI('/categories/');
  },

  getBySlug: (slug) => {
    return fetchAPI(`/categories/${slug}/`);
  },
};

// ========== CART API ==========
export const cartAPI = {
  // ADD TO CART
  addItem: async (productId, quantity = 1) => {
    const token = getToken();
    
    if (!token) {
      throw new Error('Not logged in');
    }
    
    const response = await fetch(`${API_BASE_URL}/cart/add/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ product: productId, quantity }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to add to cart');
    }
    
    return response.json();
  },

  // GET CART
  getCart: async () => {
    const token = getToken();
    
    if (!token) {
      throw new Error('Not logged in');
    }
    
    const response = await fetch(`${API_BASE_URL}/cart/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to get cart');
    }
    
    return response.json();
  },

  // REMOVE FROM CART
  removeItem: async (productId) => {
    const token = getToken();
    
    if (!token) {
      throw new Error('Not logged in');
    }
    
    const response = await fetch(`${API_BASE_URL}/cart/remove/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ product_id: productId }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to remove item');
    }
    
    return response.json();
  },
};

// EXPORT EVERYTHING
export default {
  authAPI,
  productAPI,
  categoryAPI,
  cartAPI,
  getToken,
  clearTokens,
};