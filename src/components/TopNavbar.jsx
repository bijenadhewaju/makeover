import React, { useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import {
  Smartphone,
  BadgeIndianRupee,
  ShoppingCart,
  Zap,
  Menu,
  X,
  LogOut,
  UserCircle,
  Package,
  Settings
} from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { authAPI } from "../utils/api";

const TopNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check auth status on mount and when location changes (after login redirect)
  useEffect(() => {
    checkAuthStatus();
  }, [location]); // Re-check when route changes

  // Listen for storage changes (when tokens are saved)
  useEffect(() => {
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const checkAuthStatus = () => {
    const loggedIn = authAPI.isAuthenticated();
    console.log("Checking auth status:", { 
      loggedIn, 
      hasToken: !!localStorage.getItem('access_token'),
      user: localStorage.getItem('user')
    });
    
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      const user = authAPI.getUser();
      console.log("User from localStorage:", user);
      if (user) {
        // Try different possible user name fields
        const name = user.full_name || user.name || user.email?.split('@')[0] || "User";
        setUserName(name);
        console.log("Set username to:", name);
      } else {
        setUserName("User");
      }
    } else {
      setUserName("");
    }
  };

  const toggleUserDropdown = () => {
    if (isLoggedIn) {
      setUserDropdownOpen(!userDropdownOpen);
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    setIsLoggedIn(false);
    setUserName("");
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/profile');
  };

  const handleOrdersClick = () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/orders');
  };

  // User greeting text
  const getUserGreeting = () => {
    if (!isLoggedIn) return "Hello, User";
    
    if (userName && userName !== "User") {
      return `Hello, ${userName}`;
    }
    
    return "Hello, User";
  };

  return (
    <div className="w-full bg-white border-b border-gray-200">
      {/* Centered Container */}
      <div className="max-w-[90%] mx-auto flex items-center justify-between py-2 md:py-3 relative">
        {/* Left Section */}
        <div className="flex items-center gap-2 md:gap-4">
          <NavLink to="/">
            <img
              className="w-[100px] h-[120px] md:w-16 md:h-16"
              src={assets.icon}
              alt="Makeover Me Logo"
            />
          </NavLink>

          <div className="flex flex-col justify-center">
            <p className="font-plus-jakarta-sans italic text-sm md:text-sm text-pink-500">
              The Key to a New Me
            </p>
            <p className="font-plus-jakarta-sans font-semibold text-xl md:text-xl text-pink-500">
              Makeover Me
            </p>
          </div>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 rounded-md hover:bg-gray-100 transition"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Right Section */}
        <div
          className={`
            md:flex md:flex-row md:items-center md:gap-4
            ${
              mobileMenuOpen
                ? "flex flex-col items-center gap-2 absolute top-full left-1/2 -translate-x-1/2 w-full md:w-auto bg-white px-4 py-3 shadow-lg rounded-md"
                : "hidden md:flex md:flex-row md:relative"
            }
          `}
        >
          {/* Express Delivery */}
          <div className="flex items-center gap-1 md:gap-2 whitespace-nowrap">
            <Zap className="text-amber-300 fill-amber-300 w-4 h-4 md:w-4 md:h-4" />
            <span className="font-plus-jakarta-sans text-sm md:text-md text-gray-500">
              Express delivery to
            </span>
            <select className="w-24 md:w-28 py-0.5 md:py-1 text-sm md:text-md font-semibold text-gray-800 border-none outline-none focus:ring-0 bg-transparent">
              <option>Select City</option>
              <option>Pokhara</option>
              <option>Kathmandu</option>
              <option>Biratnagar</option>
              <option>Butwal</option>
            </select>
          </div>

          {/* Buttons */}
          <button className="flex items-center gap-1 md:gap-2 bg-pink-100 rounded-2xl px-3 py-1 md:px-3 md:py-1.5 hover:bg-pink-200 transition text-sm md:text-md font-medium whitespace-nowrap">
            <Smartphone className="text-gray-600 w-4 h-4" />
            Download App
          </button>

          <NavLink
            to="/offers"
            className="flex items-center gap-1 md:gap-2 text-gray-700 hover:text-pink-600 transition text-sm md:text-md font-medium whitespace-nowrap"
          >
            <BadgeIndianRupee className="w-4 h-4 text-gray-500" />
            Offers
          </NavLink>

          <NavLink
            to="/cart"
            className="flex items-center gap-1 md:gap-2 text-gray-700 hover:text-pink-600 transition text-sm md:text-md font-medium whitespace-nowrap"
          >
            <ShoppingCart className="w-4 h-4 text-gray-500" />
            Cart
          </NavLink>

          {/* User Section */}
          <div className="relative" ref={dropdownRef}>
            {isLoggedIn ? (
              // Logged in state
              <>
                <div 
                  className="flex items-center gap-1 md:gap-2 whitespace-nowrap cursor-pointer"
                  onClick={toggleUserDropdown}
                >
                  <img
                    src={assets.user}
                    alt="User Avatar"
                    className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border border-gray-300 shadow-sm"
                  />
                  
                  <div className="flex items-center gap-1">
                    <span className="font-plus-jakarta-sans text-sm md:text-md font-medium text-gray-700">
                      {getUserGreeting()}
                    </span>
                    <svg 
                      className={`w-4 h-4 text-gray-500 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute text-center right-0  mt-2 ml-4 w-56 bg-pink-100 z-50">
                    {/* User info header */}
                    <div className="px-4 py-3 border-b">
                      <p className="font-semibold text-gray-800">{userName || "User"}</p>
                      <p className="text-sm text-gray-500 truncate">
                        {authAPI.getUser()?.email || ""}
                      </p>
                    </div>

                    {/* Dropdown items */}
                    <div className="py-2">
                      <button
                        onClick={handleProfileClick}
                        className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors text-left"
                      >
                        <UserCircle className="w-5 h-5" />
                        <div>
                          <div className="font-medium">My Profile</div>
                          <div className="text-xs text-gray-500">View and edit profile</div>
                        </div>
                      </button>

                      <button
                        onClick={handleOrdersClick}
                        className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors text-left"
                      >
                        <Package className="w-5 h-5" />
                        <div>
                          <div className="font-medium">My Orders</div>
                          <div className="text-xs text-gray-500">Track your orders</div>
                        </div>
                      </button>

                      <NavLink
                        to="/settings"
                        className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors text-left"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <Settings className="w-5 h-5" />
                        <div>
                          <div className="font-medium">Settings</div>
                          <div className="text-xs text-gray-500">Account settings</div>
                        </div>
                      </NavLink>

                      <div className="border-t border-amber-500 my-2"></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-pink-600 hover:bg-pink-50 transition-colors text-left"
                      >
                        <LogOut className="w-5 h-5" />
                        <div>
                          <div className="font-medium">Logout</div>
                          <div className="text-xs text-pink-400">Sign out of your account</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // Not logged in state - Show Login/Signup
              <div className="flex items-center gap-2 whitespace-nowrap">
                <img
                  src={assets.user}
                  alt="User Avatar"
                  className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border border-gray-300 shadow-sm"
                />
                <div className="flex items-center gap-2">
                  <NavLink
                    to="/login"
                    className="font-plus-jakarta-sans text-sm md:text-md font-medium text-gray-700 hover:text-pink-600 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                  <span className="text-gray-300">|</span>
                  <NavLink
                    to="/signup"
                    className="font-plus-jakarta-sans text-sm md:text-md font-medium text-pink-600 hover:text-pink-700 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </NavLink>
                </div>
              </div>
            )}
          </div>

          {/* Mobile: Show login/signup when not logged in */}
          {!isLoggedIn && mobileMenuOpen && (
            <div className="flex flex-col gap-2 mt-2 md:hidden">
              <NavLink
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-600 rounded-lg text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;