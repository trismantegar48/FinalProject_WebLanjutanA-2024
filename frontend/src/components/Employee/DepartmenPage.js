import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 20px;
    background-color: white;
`;

const Content = styled.div`
    flex: 1;
    overflow-y: auto;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

const Th = styled.th`
    background-color: #FFFF00;
    color: black;
    padding: 12px 15px;
    text-align: left;
    border: 1px solid #ddd;
`;

const Td = styled.td`
    padding: 12px 15px;
    color: black;
    border: 1px solid #ddd;
`;

const ErrorMessage = styled.p`
    color: red;
    margin-top: 5px;
    margin-bottom: 15px;
    text-align: center;
`;

const Footer = styled.footer`
    background-color: #61dafb;
    color: white;
    text-align: center;
    padding: 10px 0;
    margin-top: 20px;
`;

const DepartmentPage = () => {
    const [departmentList, setDepartmentList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error] = useState('');

    useEffect(() => {
        fetchDepartmentList();
    }, []);

    const fetchDepartmentList = () => {
        axios.get('http://localhost:5000/departmen/departmen')
            .then(response => {
                setDepartmentList(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the Department list!', error);
                setLoading(false);
            });
    };

    return (
        <Container>
            <Content>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Department Management</h2>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <Table>
                        <thead>
                            <tr>
                                <Th>Username</Th>
                                <Th>Nama Departmen</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {departmentList.map(department => (
                                <tr key={department.id}>
                                    <Td>{department.username}</Td>
                                    <Td>{department.nama_departmen}</Td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Content>
            <Footer>
                <p>&copy; 2023 Your Company. All Rights Reserved.</p>
            </Footer>
        </Container>
    );
};

export default DepartmentPage;

