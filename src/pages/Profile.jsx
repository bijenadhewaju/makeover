import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../utils/api";
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  CreditCard, 
  Settings,
  LogOut,
  Edit,
  Save,
  X,
  Phone,
  Mail,
  Shield,
  Calendar,
  Package,
  CheckCircle,
  Clock,
  Bell,
  Lock,
  UserCircle
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: "",
    email: "",
    contact: ""
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    checkAuthAndLoadUser();
  }, []);

  const checkAuthAndLoadUser = async () => {
    const isLoggedIn = authAPI.isAuthenticated();
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      // Try to get current user from API
      const currentUser = await authAPI.getCurrentUser();
      console.log("User data from API:", currentUser);
      setUser(currentUser);
      setEditForm({
        full_name: currentUser.full_name || '',
        email: currentUser.email || '',
        contact: currentUser.contact || ''
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      // Fallback to stored user data
      const storedUser = authAPI.getUser();
      if (storedUser) {
        console.log("Using stored user:", storedUser);
        setUser(storedUser);
        setEditForm({
          full_name: storedUser.full_name || '',
          email: storedUser.email || '',
          contact: storedUser.contact || ''
        });
      } else {
        showMessage('error', 'Failed to load user data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    navigate('/login');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Update user profile via API
      const updatedUser = await authAPI.updateProfile({
        full_name: editForm.full_name,
        contact: editForm.contact
      });
      
      // Update email separately if it changed
      if (editForm.email !== user?.email) {
        // You might need a separate endpoint for email update
        showMessage('warning', 'Email update requires verification');
      }
      
      setUser(updatedUser);
      showMessage('success', 'Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      showMessage('error', error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="w-5 h-5" />, available: true },
    { id: "orders", label: "Orders", icon: <ShoppingBag className="w-5 h-5" />, available: false },
    { id: "wishlist", label: "Wishlist", icon: <Heart className="w-5 h-5" />, available: false },
    { id: "addresses", label: "Addresses", icon: <MapPin className="w-5 h-5" />, available: false },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-5 h-5" />, available: false },
    { id: "security", label: "Security", icon: <Lock className="w-5 h-5" />, available: false },
  ];

  const getInitials = () => {
    if (user?.full_name) {
      const names = user.full_name.split(' ');
      if (names.length > 1) {
        return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
      }
      return user.full_name.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const getFirstName = () => {
    if (user?.full_name) {
      return user.full_name.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto pt-32 px-4 min-h-screen">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-gray-200 rounded-lg h-64"></div>
            </div>
            <div className="lg:col-span-3">
              <div className="bg-gray-200 rounded-lg h-96"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-32 px-4 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
        <p className="text-gray-500 mt-2">Welcome back, {getFirstName()}!</p>
      </div>

      {/* Success/Error Message */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg border ${
          message.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : message.type === 'warning'
            ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-center">
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 mr-2" />
            ) : message.type === 'warning' ? (
              <Clock className="w-5 h-5 mr-2" />
            ) : (
              <X className="w-5 h-5 mr-2" />
            )}
            {message.text}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* User Info Card */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                  {getInitials()}
                </div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {user?.full_name || getFirstName()}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{user?.email || 'No email'}</p>
                <div className="mt-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Shield className="w-3 h-3 mr-1" />
                    Active Account
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="p-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  } ${!tab.available ? 'opacity-60 cursor-not-allowed' : ''}`}
                  disabled={!tab.available}
                >
                  <div className={`${activeTab === tab.id ? 'text-white' : 'text-gray-500'}`}>
                    {tab.icon}
                  </div>
                  <span className="font-medium text-left flex-1">{tab.label}</span>
                  {!tab.available && (
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded">
                      Soon
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage your personal details</p>
                  </div>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-white border border-gray-300 hover:border-pink-500 text-pink-600 hover:text-pink-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditForm({
                          full_name: user.full_name || '',
                          email: user.email || '',
                          contact: user.contact || ''
                        });
                      }}
                      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {isEditing ? (
                <form onSubmit={handleEditSubmit} className="p-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={editForm.full_name}
                        onChange={(e) => setEditForm({...editForm, full_name: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                        required
                        disabled
                        placeholder="Email cannot be changed"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Email address cannot be changed for security reasons
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        value={editForm.contact}
                        onChange={(e) => setEditForm({...editForm, contact: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                        placeholder="Enter your contact number"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Used for order updates and notifications
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {saving ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="p-6">
                  <div className="space-y-8">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <UserCircle className="w-5 h-5 text-pink-500" />
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                          <p className="text-gray-900 text-lg">
                            {user?.full_name || 'Not set'}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email Address
                          </h4>
                          <p className="text-gray-900 text-lg">{user?.email || 'Not set'}</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Contact Number
                          </h4>
                          <p className="text-gray-900 text-lg">
                            {user?.contact ? (
                              <span className="flex items-center gap-2">
                                {user.contact}
                                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                                  Verified
                                </span>
                              </span>
                            ) : 'Not provided'}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Account Created
                          </h4>
                          <p className="text-gray-900 text-lg">
                            {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Recently'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Account Status */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-pink-500" />
                        Account Status
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Active Account
                        </span>
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Email Verified
                        </span>
                        {user?.contact && (
                          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Contact Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Coming Soon Tabs */}
          {activeTab !== "profile" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-white">
                <h2 className="text-xl font-bold text-gray-900">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {activeTab === "orders" ? "Track and manage your orders" :
                   activeTab === "wishlist" ? "Your saved favorite items" :
                   activeTab === "addresses" ? "Manage your shipping addresses" :
                   activeTab === "notifications" ? "Configure your notification preferences" :
                   "Manage your account security settings"}
                </p>
              </div>
              
              <div className="p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-pink-500">
                    {tabs.find(t => t.id === activeTab)?.icon}
                  </div>
                </div>
                
                <div className="max-w-md mx-auto">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Coming Soon!
                  </h3>
                  <p className="text-gray-600 mb-8">
                    We're working hard to bring you the {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} feature. 
                    This section will be available in our next update.
                  </p>
                  
                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h4 className="font-semibold text-gray-900 mb-3">What to Expect:</h4>
                    <ul className="text-left text-gray-600 space-y-2">
                      {activeTab === "orders" && (
                        <>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Track your order status in real-time</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>View detailed order history</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Download invoices and receipts</span>
                          </li>
                        </>
                      )}
                      {activeTab === "wishlist" && (
                        <>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Save your favorite products</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Get notified when prices drop</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Share your wishlist with others</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => navigate('/products')}
                      className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
                    >
                      Browse Products
                    </button>
                    <button
                      onClick={() => setActiveTab("profile")}
                      className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Back to Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;