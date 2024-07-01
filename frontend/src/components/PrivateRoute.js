import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, requiredRole, loggedInUser }) => {
    if (!loggedInUser || loggedInUser.role !== requiredRole) {
        // Jika pengguna tidak ada atau rolenya tidak sesuai, arahkan kembali ke halaman login
        return <Navigate to="/login" />;
    }

    // Jika pengguna memiliki role yang benar, lanjutkan ke halaman yang diminta
    return <Route element={element} />;
};

export default PrivateRoute;
