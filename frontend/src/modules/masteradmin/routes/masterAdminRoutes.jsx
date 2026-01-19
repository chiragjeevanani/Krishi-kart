import { Route } from 'react-router-dom';
import MasterAdminLayout from '../components/layout/MasterAdminLayout';
import DashboardScreen from '../pages/DashboardScreen';
import LoginScreen from '../pages/LoginScreen';
import OrdersScreen from '../pages/OrdersScreen';
import VendorAssignmentScreen from '../pages/VendorAssignmentScreen';
import FranchiseManagementScreen from '../pages/FranchiseManagementScreen';
import VendorManagementScreen from '../pages/VendorManagementScreen';
import DeliveryMonitoringScreen from '../pages/DeliveryMonitoringScreen';
import TakeawayMonitoringScreen from '../pages/TakeawayMonitoringScreen';
import AnalyticsScreen from '../pages/AnalyticsScreen';
import SettingsScreen from '../pages/SettingsScreen';

export const masterAdminRoutes = (
    <Route path="/masteradmin" element={<MasterAdminLayout />}>
        <Route index element={<DashboardScreen />} />
        <Route path="dashboard" element={<DashboardScreen />} />
        <Route path="login" element={<LoginScreen />} />
        <Route path="orders" element={<OrdersScreen />} />
        <Route path="assignment" element={<VendorAssignmentScreen />} />
        <Route path="franchises" element={<FranchiseManagementScreen />} />
        <Route path="vendors" element={<VendorManagementScreen />} />
        <Route path="delivery" element={<DeliveryMonitoringScreen />} />
        <Route path="kiosk" element={<TakeawayMonitoringScreen />} />
        <Route path="analytics" element={<AnalyticsScreen />} />
        <Route path="settings" element={<SettingsScreen />} />
    </Route>
);
