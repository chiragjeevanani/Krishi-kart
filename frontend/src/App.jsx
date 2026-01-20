import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './modules/user/layouts/AppLayout'
import SplashScreen from './modules/user/pages/SplashScreen'
import LoginScreen from './modules/user/pages/LoginScreen'
import HomeScreen from './modules/user/pages/HomeScreen'
import CategoriesScreen from './modules/user/pages/CategoriesScreen'
import ProductListScreen from './modules/user/pages/ProductListScreen'
import ProductDetailScreen from './modules/user/pages/ProductDetailScreen'
import CartScreen from './modules/user/pages/CartScreen'
import ProfileScreen from './modules/user/pages/ProfileScreen'
import OrdersScreen from './modules/user/pages/OrdersScreen'
import CheckoutScreen from './modules/user/pages/CheckoutScreen'
import EditProfileScreen from './modules/user/pages/EditProfileScreen'
import AddressBookScreen from './modules/user/pages/AddressBookScreen'
import OrderTrackingScreen from './modules/user/pages/OrderTrackingScreen'
import OrderSummaryScreen from './modules/user/pages/OrderSummaryScreen'
import WalletScreen from './modules/user/pages/WalletScreen'
import NotificationsScreen from './modules/user/pages/NotificationsScreen'
import FavoritesScreen from './modules/user/pages/FavoritesScreen'
import VerificationScreen from './modules/user/pages/VerificationScreen'
import HelpSupportScreen from './modules/user/pages/HelpSupportScreen'
import AboutScreen from './modules/user/pages/AboutScreen'
import WishlistScreen from './modules/user/pages/WishlistScreen'
import { WishlistProvider } from './modules/user/contexts/WishlistContext'

// Franchise Module Imports
import FranchiseLayout from './modules/franchise/components/layout/FranchiseLayout'
import FranchiseLogin from './modules/franchise/pages/LoginScreen'
import FranchiseDashboard from './modules/franchise/pages/DashboardScreen'
import FranchiseOrders from './modules/franchise/pages/OrdersScreen'
import OrderDetail from './modules/franchise/pages/OrderDetailScreen'
import FranchiseTakeaway from './modules/franchise/pages/TakeawayScreen'
import FranchiseInventory from './modules/franchise/pages/InventoryScreen'
import FranchiseProfile from './modules/franchise/pages/ProfileScreen'
import FranchiseDelivery from './modules/franchise/pages/DeliveryScreen'
import { FranchiseAuthProvider } from './modules/franchise/contexts/FranchiseAuthContext'

// Master Admin Module Imports
import { masterAdminRoutes } from './modules/masteradmin/routes/masterAdminRoutes';
import { vendorRoutes } from './modules/vendor/routes/vendorRoutes';
import { deliveryRoutes } from './modules/delivery/routes/deliveryRoutes';

import { CartProvider } from './modules/user/contexts/CartContext'
import { OrderProvider } from './modules/user/contexts/OrderContext'
import { WalletProvider } from './modules/user/contexts/WalletContext'

function App() {
  return (
    <FranchiseAuthProvider>
      <WishlistProvider>
        <WalletProvider>
          <OrderProvider>
            <CartProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<SplashScreen />} />
                  <Route path="/login" element={<LoginScreen />} />

                  <Route element={<AppLayout />}>
                    <Route path="/home" element={<HomeScreen />} />
                    <Route path="/categories" element={<CategoriesScreen />} />
                    <Route path="/products/:category" element={<ProductListScreen />} />
                    <Route path="/product/:id" element={<ProductDetailScreen />} />
                    <Route path="/cart" element={<CartScreen />} />
                    <Route path="/checkout" element={<CheckoutScreen />} />
                    <Route path="/profile" element={<ProfileScreen />} />
                    <Route path="/orders" element={<OrdersScreen />} />
                    <Route path="/edit-profile" element={<EditProfileScreen />} />
                    <Route path="/address-book" element={<AddressBookScreen />} />
                    <Route path="/track-order/:id" element={<OrderTrackingScreen />} />
                    <Route path="/order-summary/:id" element={<OrderSummaryScreen />} />
                    <Route path="/wallet" element={<WalletScreen />} />
                    <Route path="/notifications" element={<NotificationsScreen />} />
                    <Route path="/favorites" element={<FavoritesScreen />} />
                    <Route path="/wishlist" element={<WishlistScreen />} />
                    <Route path="/verification" element={<VerificationScreen />} />
                    <Route path="/help-support" element={<HelpSupportScreen />} />
                    <Route path="/about" element={<AboutScreen />} />
                  </Route>

                  {/* Franchise Module */}
                  <Route path="/franchise">
                    <Route path="login" element={<FranchiseLogin />} />
                    <Route element={<FranchiseLayout />}>
                      <Route path="dashboard" element={<FranchiseDashboard />} />
                      <Route path="orders" element={<FranchiseOrders />} />
                      <Route path="orders/:id" element={<OrderDetail />} />
                      <Route path="takeaway" element={<FranchiseTakeaway />} />
                      <Route path="inventory" element={<FranchiseInventory />} />
                      <Route path="dispatch" element={<FranchiseDelivery />} />
                      <Route path="profile" element={<FranchiseProfile />} />
                    </Route>
                  </Route>

                  {masterAdminRoutes}
                  {vendorRoutes}
                  {deliveryRoutes}

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </BrowserRouter>
            </CartProvider>
          </OrderProvider>
        </WalletProvider>
      </WishlistProvider>
    </FranchiseAuthProvider>
  )
}

export default App
