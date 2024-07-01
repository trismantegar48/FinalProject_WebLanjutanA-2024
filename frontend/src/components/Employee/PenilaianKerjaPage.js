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

const PenilaianKinerjaPage = () => {
    const [penilaianList, setPenilaianList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error] = useState('');
    
    useEffect(() => {
        fetchPenilaianList();
    }, []);

    const fetchPenilaianList = () => {
        axios.get('http://localhost:5000/penilaian_kerja/penilaian_kerja')
            .then(response => {
                setPenilaianList(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the Penilaian Kinerja list!', error);
                setLoading(false);
            });
    };

    return (
        <Container>
            <Content>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Penilaian Kerja Management</h2>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <Table>
                        <thead>
                            <tr>
                                <Th>Username</Th>
                                <Th>Penilaian</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {penilaianList.map(penilaian => (
                                <tr key={penilaian.id}>
                                    <Td>{penilaian.username}</Td>
                                    <Td>{penilaian.penilaian}</Td>
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

export default PenilaianKinerjaPage;
