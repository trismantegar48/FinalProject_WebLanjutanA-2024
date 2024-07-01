import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FaSignOutAlt } from 'react-icons/fa';

const theme = {
  colors: {
    primary: '#1C1C1E',
    secondary: '#ffffff',
    hover: '#3c4251',
    active: '#4b5266',
  },
  shadows: {
    light: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  fontWeights: {
    regular: 400,
    bold: 500,
  },
};

const NavContainer = styled.nav`
  ${css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.secondary};
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 30px;
    box-shadow: ${theme.shadows.light};
    transition: background-color 0.3s;
  `}

  &:hover {
    background-color: ${theme.colors.hover};
  }
`;

const NavMenu = styled.ul`
  ${css`
    display: flex;
    list-style-type: none;
    padding: 0;
    flex: 1;
    justify-content: center;
  `}

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
`;

const NavItem = styled.li`
  ${css`
    margin-right: 15px;
  `}

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const NavLinkStyled = styled(NavLink)`
  ${css`
    text-decoration: none;
    color: ${theme.colors.secondary};
    padding: 15px;
    transition: background-color 0.3s;
    font-weight: ${theme.fontWeights.regular};
    display: flex;
    align-items: center;
  `}

  &:hover {
    background-color: ${theme.colors.hover};
    border-radius: 5px;
  }

  &.active {
    background-color: ${theme.colors.active};
    border-radius: 5px;
  }
`;

const LogoutButton = styled.button`
  ${css`
    background-color: transparent;
    color: ${theme.colors.secondary};
    border: none;
    padding: 12px 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-weight: ${theme.fontWeights.regular};
    display: flex;
    align-items: center;
  `}

  &:hover {
    background-color: ${theme.colors.hover};
    border-radius: 5px;
  }

  &:focus {
    outline: none;
  }
`;

const Navbar = () => {
  const handleLogout = () => {
    // Implement logout functionality here
    window.location.href = '/login';
  };

  return (
    <NavContainer>
      <NavMenu>
        <NavItem>
          <NavLinkStyled to="/employee/cuti" activeClassName="active">
            Cuti
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/employee/absensi" activeClassName="active">
            Absensi
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/employee/users" activeClassName="active">
            Users
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/employee/penilaian_kerja" activeClassName="active">
            Penilaian Kerja
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/employee/departmen" activeClassName="active">
            Departmen
          </NavLinkStyled>
        </NavItem>
      </NavMenu>
      <LogoutButton onClick={handleLogout}>
        <FaSignOutAlt />
      </LogoutButton>
    </NavContainer>
  );
};

export default Navbar;
