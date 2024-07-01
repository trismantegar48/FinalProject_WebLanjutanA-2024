import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Container = styled.div`
    padding: 20px;
    background-color: #f4f6f8;
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

const Button = styled.button`
    background-color: black;
    color: #FFFF00;
    border: none;
    border-radius: 5px;
    padding: 8px 12px;
    cursor: pointer;
    margin-right: 5px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: black;
    }
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
`;

const Input = styled.input`
    padding: 10px;
    margin: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    flex: 1;
`;

const SubmitButton = styled(Button)`
    background-color: #FFFF00;
    color: black;
    margin-top: 10px;

    &:hover {
        background-color: black;
        color: #FFFF00;
    }
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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [error, setError] = useState('');

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

    const handleCreateUser = (e) => {
        e.preventDefault();
        if (!username || !password || !role) {
            setError('Please fill in all fields');
            return;
        }
        if (editingUser) {
            // Update user
            axios.put(`http://localhost:5000/users/users/${editingUser.id}`, { username, password, role })
                .then(response => {
                    fetchUsers();
                    setUsername('');
                    setPassword('');
                    setRole('');
                    setEditingUser(null);
                    setError('');
                })
                .catch(error => {
                    console.error('There was an error updating the user!', error);
                    setError('There was an error updating the user');
                });
        } else {
            // Create user
            axios.post('http://localhost:5000/users/users', { username, password, role })
                .then(response => {
                    fetchUsers();
                    setUsername('');
                    setPassword('');
                    setRole('');
                    setError('');
                })
                .catch(error => {
                    console.error('There was an error creating the user!', error);
                    setError('There was an error creating the user');
                });
        }
    };

    const handleEditUser = (user) => {
        setUsername(user.username);
        setPassword(''); // Clear password field for security reasons
        setRole(user.role);
        setEditingUser(user);
    };

    const handleDeleteUser = (id) => {
        axios.delete(`http://localhost:5000/users/users/${id}`)
            .then(response => {
                fetchUsers();
            })
            .catch(error => {
                console.error('There was an error deleting the user!', error);
                setError('There was an error deleting the user');
            });
    };

    return (
        <Container>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Users</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form onSubmit={handleCreateUser}>
                <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder={editingUser ? "New Password" : "Password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
                <SubmitButton type="submit">{editingUser ? 'Update User' : 'Add User'}</SubmitButton>
            </Form>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <Th>Username</Th>
                            <Th>Role</Th>
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <Td>{user.username}</Td>
                                <Td>{user.role}</Td>
                                <Td>
                                    <Button onClick={() => handleEditUser(user)}><FaEdit /></Button>
                                    <Button onClick={() => handleDeleteUser(user.id)}><FaTrash /></Button>
                                </Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default UsersPage;
