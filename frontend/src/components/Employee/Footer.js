import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaGithub } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #1C1C1E;
  color: #fff;
  padding: 15px 0;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 20px;
`;

const SocialLink = styled.a`
  color: #fff;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #3c4251;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Content>
        <div>
          <h3>Follow Us</h3>
          <SocialIcons>
            <SocialLink href="#"><FaFacebookF /></SocialLink>
            <SocialLink href="#"><FaTwitter /></SocialLink>
            <SocialLink href="#"><FaInstagram /></SocialLink>
            <SocialLink href="#"><FaLinkedinIn /></SocialLink>
            <SocialLink href="#"><FaYoutube /></SocialLink>
            <SocialLink href="#"><FaGithub /></SocialLink>
          </SocialIcons>
        </div>
        <div>
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </Content>
    </FooterContainer>
  );
};

export default Footer;
