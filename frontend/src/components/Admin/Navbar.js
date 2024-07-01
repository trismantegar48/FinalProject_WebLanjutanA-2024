import React from 'react';
import styled from 'styled-components';
import { FaBell, FaEnvelope, FaUserCircle } from 'react-icons/fa';

const NavbarContainer = styled.div`
    width: calc(100% - 300px);
    background-color: #1C1C1E;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
    
`;

const NavLeft = styled.div`
    display: flex;
    align-items: center;
`;

const NavRight = styled.div`
    display: flex;
    align-items: center;
`;

const NavItem = styled.div`
    margin: 0 15px;
    position: relative;

    & > svg {
        font-size: 1.5rem;
        cursor: pointer;
    }

    &::after {
        content: '';
        width: 8px;
        height: 8px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        top: 0;
        right: 0;
        display: ${(props) => (props.hasNotification ? 'block' : 'none')};
    }
`;

const NavProfile = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;

    & > svg {
        margin-left: 10px;
        font-size: 1.5rem;
    }
`;

const Navbar = () => {
    return (
        <NavbarContainer>
            <NavLeft>
                <h2>Admin Dashboard</h2>
            </NavLeft>
            <NavRight>
                <NavProfile>
                    <span>Admin</span>
                    <FaUserCircle />
                </NavProfile>
            </NavRight>
        </NavbarContainer>
    );
};

export default Navbar;
