import React from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
    background-image: url('${process.env.PUBLIC_URL}/dashboard.png');
    background-repeat: no-repeat;
    background-size: cover;
`;

const DashboardContent = () => (
    <ContentWrapper>
        <h1 style={{color: '#FFFF00'}}>
            SELAMAT DATANG
        </h1>
    </ContentWrapper>
);

export default DashboardContent;
