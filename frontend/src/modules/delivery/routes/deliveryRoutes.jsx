import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import DeliveryLayout from '../components/layout/DeliveryLayout';

const DeliveryPartnerLogin = lazy(() => import('../pages/DeliveryPartnerLogin'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const DeliveryRequests = lazy(() => import('../pages/DeliveryRequests'));
const ActiveDelivery = lazy(() => import('../pages/ActiveDelivery'));
const DeliveryHistory = lazy(() => import('../pages/DeliveryHistory'));
const Profile = lazy(() => import('../pages/Profile'));
const MapTracking = lazy(() => import('../pages/MapTracking'));
const PickupConfirmation = lazy(() => import('../pages/PickupConfirmation'));
const DeliveryCompletion = lazy(() => import('../pages/DeliveryCompletion'));

export const deliveryRoutes = (
    <Route path="delivery">
        <Route path="login" element={<DeliveryPartnerLogin />} />
        <Route element={<DeliveryLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="requests" element={<DeliveryRequests />} />
            <Route path="active" element={<ActiveDelivery />} />
            <Route path="history" element={<DeliveryHistory />} />
            <Route path="profile" element={<Profile />} />
            <Route path="map" element={<MapTracking />} />
            <Route path="pickup" element={<PickupConfirmation />} />
            <Route path="completion" element={<DeliveryCompletion />} />
        </Route>
    </Route>
);
