import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 20px;
    background-color: #f4f6f8;
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
    const [username, setUsername] = useState('');
    const [namaDepartmen, setNamaDepartmen] = useState('');
    const [error, setError] = useState('');
    const [editId, setEditId] = useState(null);

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

    const handleCreateDepartment = (e) => {
        e.preventDefault();
        if (!username || !namaDepartmen) {
            setError('Please fill in all fields');
            return;
        }
        if (editId) {
            axios.put(`http://localhost:5000/departmen/departmen/${editId}`, { username, nama_departmen: namaDepartmen })
                .then(response => {
                    fetchDepartmentList();
                    setUsername('');
                    setNamaDepartmen('');
                    setEditId(null);
                    setError('');
                })
                .catch(error => {
                    console.error('There was an error updating the Department!', error);
                    setError('There was an error updating the Department');
                });
        } else {
            axios.post('http://localhost:5000/departmen/departmen', { username, nama_departmen: namaDepartmen })
                .then(response => {
                    fetchDepartmentList();
                    setUsername('');
                    setNamaDepartmen('');
                    setError('');
                })
                .catch(error => {
                    console.error('There was an error creating the Department!', error);
                    setError('There was an error creating the Department');
                });
        }
    };

    const handleEditDepartment = (department) => {
        setUsername(department.username);
        setNamaDepartmen(department.nama_departmen);
        setEditId(department.id);
    };

    const handleDeleteDepartment = (id) => {
        axios.delete(`http://localhost:5000/departmen/departmen/${id}`)
            .then(response => {
                fetchDepartmentList();
            })
            .catch(error => {
                console.error('There was an error deleting the Department!', error);
            });
    };

    return (
        <Container>
            <Content>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Department Management</h2>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Form onSubmit={handleCreateDepartment}>
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Nama Departmen"
                        value={namaDepartmen}
                        onChange={(e) => setNamaDepartmen(e.target.value)}
                    />
                    <SubmitButton type="submit">{editId ? 'Update Department' : 'Add Department'}</SubmitButton>
                </Form>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <Table>
                        <thead>
                            <tr>
                                <Th>Username</Th>
                                <Th>Nama Departmen</Th>
                                <Th>Actions</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {departmentList.map(department => (
                                <tr key={department.id}>
                                    <Td>{department.username}</Td>
                                    <Td>{department.nama_departmen}</Td>
                                    <Td>
                                        <Button onClick={() => handleEditDepartment(department)}>Edit</Button>
                                        <Button onClick={() => handleDeleteDepartment(department.id)}>Delete</Button>
                                    </Td>
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

