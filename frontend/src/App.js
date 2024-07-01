import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AdminPage from './components/Admin/AdminPage';
import UsersPage from './components/Admin/UsersPage';
import AbsensiPage from './components/Admin/AbsensiPage';
import CutiPage from './components/Admin/CutiPage';
import DepartmentPage from './components/Admin/DepartmenPage';
import PenilaianKinerjaPage from './components/Admin/PenilaianKerja';
import EmployeePage from './components/Employee/EmployeePage';

function App() {
    const [loggedInUser, setLoggedInUser] = useState(null); // Ubah initial state loggedInUser menjadi null

    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Redirect ke halaman register jika root */}
                    <Route path="/" element={<Navigate to="/register" />} />
                    <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
                    <Route path="/register" element={<Register />} />

                    {/* Gunakan PrivateRoute untuk halaman Admin */}
                    <Route 
                        path="/admin"
                        element={
                            loggedInUser && loggedInUser.role === 'admin' ? (
                                <AdminPage username={loggedInUser} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }>
                        <Route path="users" element={<UsersPage />} />
                        <Route path="absensi" element={<AbsensiPage />} />
                        <Route path="cuti" element={<CutiPage />} />
                        <Route path="departmen" element={<DepartmentPage />} />
                        <Route path="penilaian_kerja" element={<PenilaianKinerjaPage />} />
                    </Route>
                    <Route path='/employee' element={<EmployeePage />}>
                        <Route path="users" element={<UsersPage />} />
                        <Route path="absensi" element={<AbsensiPage />} />
                        <Route path="cuti" element={<CutiPage />} />
                        <Route path="penilaian_kerja" element={<PenilaianKinerjaPage />} />
                        <Route path="departmen" element={<DepartmentPage />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
