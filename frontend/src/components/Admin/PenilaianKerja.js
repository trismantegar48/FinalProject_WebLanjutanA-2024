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
    flex: 1;z
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

const PenilaianKinerjaPage = () => {
    const [penilaianList, setPenilaianList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [penilaian, setPenilaian] = useState('');
    const [error, setError] = useState('');
    const [editId, setEditId] = useState(null);

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

    const handleCreatePenilaian = (e) => {
        e.preventDefault();
        if (!username || !penilaian) {
            setError('Please fill in all fields');
            return;
        }
        if (editId) {
            axios.put(`http://localhost:5000/penilaian_kerja/penilaian_kerja/${editId}`, { username, penilaian })
                .then(response => {
                    fetchPenilaianList();
                    setUsername('');
                    setPenilaian('');
                    setEditId(null);
                    setError('');
                })
                .catch(error => {
                    console.error('There was an error updating the Penilaian!', error);
                    setError('There was an error updating the Penilaian');
                });
        } else {
            axios.post('http://localhost:5000/penilaian_kerja/penilaian_kerja', { username, penilaian })
                .then(response => {
                    fetchPenilaianList();
                    setUsername('');
                    setPenilaian('');
                    setError('');
                })
                .catch(error => {
                    console.error('There was an error creating the Penilaian!', error);
                    setError('There was an error creating the Penilaian');
                });
        }
    };

    const handleEditPenilaian = (penilaian) => {
        setUsername(penilaian.username);
        setPenilaian(penilaian.penilaian);
        setEditId(penilaian.id);
    };

    const handleDeletePenilaian = (id) => {
        axios.delete(`http://localhost:5000/penilaian_kerja/penilaian_kerja/${id}`)
            .then(response => {
                fetchPenilaianList();
            })
            .catch(error => {
                console.error('There was an error deleting the Penilaian!', error);
            });
    };

    return (
        <Container>
            <Content>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Penilaian Kerja Management</h2>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Form onSubmit={handleCreatePenilaian}>
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Penilaian"
                        value={penilaian}
                        onChange={(e) => setPenilaian(e.target.value)}
                    />
                    <SubmitButton type="submit">{editId ? 'Update Penilaian' : 'Add Penilaian'}</SubmitButton>
                </Form>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <Table>
                        <thead>
                            <tr>
                                <Th>Username</Th>
                                <Th>Penilaian</Th>
                                <Th>Actions</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {penilaianList.map(penilaian => (
                                <tr key={penilaian.id}>
                                    <Td>{penilaian.username}</Td>
                                    <Td>{penilaian.penilaian}</Td>
                                    <Td>
                                        <Button onClick={() => handleEditPenilaian(penilaian)}>Edit</Button>
                                        <Button onClick={() => handleDeletePenilaian(penilaian.id)}>Delete</Button>
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

export default PenilaianKinerjaPage;
