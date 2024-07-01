import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import AbsensiPage from './AbsensiPage';
import UsersPage from './UsersPage';
import CutiPage from './CutiPage';
import Navbar from './Navbar';
import DepartmentPage from './DepartmenPage';
import PenilaianKinerjaPage from './PenilaianKerja';
import DashboardContent from './DashboardContent';

const Container = styled.div`
    display: flex;
    height: 100vh;
`;

const ContentContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 250px; // Adjust based on sidebar width
    margin-top: 84px; // Adjust padding for top navbar
    background-color: #f4f6f8;
    overflow-y: auto;
`;

const AdminPage = () => {
    return (
        <Container>
            <Sidebar />
            <ContentContainer>
                <Navbar />
                <Routes>
                    <Route path="/" element={<DashboardContent />} />
                    <Route path="absensi" element={<AbsensiPage />} />
                    <Route path="cuti" element={<CutiPage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="departmen" element={<DepartmentPage />} />
                    <Route path="penilaian_kerja" element={<PenilaianKinerjaPage />} />
                </Routes>
            </ContentContainer>
        </Container>
    );
};

export default AdminPage;
