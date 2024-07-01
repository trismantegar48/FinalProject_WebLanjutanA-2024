import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaMoneyCheckAlt, FaClock, FaSignOutAlt, FaBook, FaTag } from 'react-icons/fa';

const SidebarContainer = styled.div`
    width: 200px;
    background-color: #1f1f1f;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px;
    color: white;
    font-family: 'Poppins', sans-serif;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
`;

const BrandContainer = styled.div`
    width: 100%;
    color: #FFFF00;
    padding: 20px;
    text-align: center;
    margin-bottom: 30px;
    font-size: 1.5rem;
    font-weight: bold;
`;

const SidebarLink = styled(Link)`
    color: #abb2bf;
    text-decoration: none;
    margin: 10px 0;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 10px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    font-size: 18px;
    
    &:hover {
        background-color: #FFFF00;
        color: #1f1f1f;
        transform: translateX(10px);
    }

    & > svg {
        margin-right: 20px;
        font-size: 20px;
    }
`;

const LogoutLink = styled(Link)`
    color: #abb2bf;
    text-decoration: none;
    margin-top: 10px;
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 10px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    font-size: 18px;
    
    &:hover {
        background-color: #e06c75;
        color: white;
        transform: translateX(10px);
    }

    & > svg {
        margin-right: 20px;
        font-size: 20px;
    }
`;

const Sidebar = () => {
    return (
        <SidebarContainer>
            <BrandContainer>
                Website
            </BrandContainer>
            <SidebarLink to="/admin">
                <FaHome />
                Dashboard
            </SidebarLink>
            <SidebarLink to="/admin/users">
                <FaUser />
                Users
            </SidebarLink>
            <SidebarLink to="/admin/absensi">
                <FaMoneyCheckAlt />
                Absensi
            </SidebarLink>
            <SidebarLink to="/admin/cuti">
                <FaClock />
                Cuti
            </SidebarLink>
            <SidebarLink to="/admin/departmen">
                <FaTag />
                Departmen
            </SidebarLink>
            <SidebarLink to="/admin/penilaian_kerja">
                <FaBook />
                Penilaian Kerja
            </SidebarLink>
            <LogoutLink to="/login">
                <FaSignOutAlt />
                Logout
            </LogoutLink>
        </SidebarContainer>
    );
};

export default Sidebar;
