import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AdminDashboard from './Dashboard/AdminDashboard';
import SurveyorDashboard from './Dashboard/SurveyorDashboard';
import TimUtamaDashboard from './Dashboard/TimUtamaDashboard';
import RelawanDashboard from './Dashboard/RelawanDashboard';

export default function Dashboard({ auth, stats, filters }) {
    const userRole = auth?.user?.role || 'admin';
    const isAdmin = userRole === 'admin';

    // State untuk simulator tampilan admin
    const [viewMode, setViewMode] = useState(isAdmin ? 'admin' : userRole);

    return (
        <AuthenticatedLayout user={auth.user} currentView={viewMode} onSwitchView={setViewMode}>
            {viewMode === 'admin' && <AdminDashboard stats={stats} />}
            {viewMode === 'surveyor' && <SurveyorDashboard stats={stats} filters={filters} />}
            {viewMode === 'tim_utama' && <TimUtamaDashboard stats={stats} />}
            {viewMode === 'relawan' && <RelawanDashboard stats={stats} filters={filters} />}
        </AuthenticatedLayout>
    );
}