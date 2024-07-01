import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
    height: 100%;
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

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:5000/users/users')
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
                setLoading(false);
            });
    };

    return (
        <Container>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Users</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <Th>Username</Th>
                            <Th>Role</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <Td>{user.username}</Td>
                                <Td>{user.role}</Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default UsersPage;
