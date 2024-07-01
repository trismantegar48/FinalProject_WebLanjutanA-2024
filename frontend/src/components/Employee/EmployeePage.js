import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import CutiPage from './CutiPage';
import Navbar from './Navbar';
import AbsensiPage from './AbsensiPage';
import UsersPage from './UsersPage';
import Footer from './Footer';
import PenilaianKinerjaPage from './PenilaianKerjaPage';
import DepartmentPage from './DepartmenPage';

const Container = styled.div`
    padding: 0;
`;

const ContainerContent = styled.div`
    padding-left: 90px;
    padding-right: 90px;
`;

const EmployeePage = () => {
    return (
        <Container>
                <Navbar />
                <ContainerContent>
                    <Routes>
                        <Route path="/" element={<CutiPage />} />
                        <Route path="cuti" element={<CutiPage />} />
                        <Route path="absensi" element={<AbsensiPage />} />
                        <Route path="users" element={<UsersPage />} />
                        <Route path="penilaian_kerja" element={<PenilaianKinerjaPage />} />
                        <Route path="departmen" element={<DepartmentPage />} />
                    </Routes>
                </ContainerContent>
                <Footer />
        </Container>
    );
};

export default EmployeePage;

