import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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

const AbsensiPage = () => {
    const [Absensis, setAbsensis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAbsensis();
    }, []);

    const fetchAbsensis = () => {
        axios.get('http://localhost:5000/absensi/absensi')
            .then(response => {
                setAbsensis(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the Absensis!', error);
                setLoading(false);
            });
    };

    const handleCreateAbsensi = (e) => {
        e.preventDefault();
        if (!username || !date || !status) {
            setError('Please fill in all fields');
            return;
        }
        axios.post('http://localhost:5000/absensi/absensi', { username, date, status })
            .then(response => {
                fetchAbsensis();
                setUsername('');
                setDate('');
                setStatus('');
                setError('');
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    setError('Username not found in the company');
                } else {
                    setError('There was an error creating the Absensi');
                }
                console.error('There was an error creating the Absensi!', error);
            });
    };

    const handleUpdateAbsensi = (id, newStatus) => {
        axios.put(`http://localhost:5000/absensi/absensi/${id}`, { status: newStatus })
            .then(response => {
                fetchAbsensis();
            })
            .catch(error => {
                console.error('There was an error updating the Absensi!', error);
            });
    };

    const handleDeleteAbsensi = (id) => {
        axios.delete(`http://localhost:5000/absensi/absensi/${id}`)
            .then(response => {
                fetchAbsensis();
            })
            .catch(error => {
                console.error('There was an error deleting the Absensi!', error);
            });
    };

    return (
        <Container>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Absensi Management</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form onSubmit={handleCreateAbsensi}>
                <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <SubmitButton type="submit">Add Absensi</SubmitButton>
            </Form>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <Th>Username</Th>
                            <Th>Date</Th>
                            <Th>Status</Th>
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {Absensis.map(Absensi => (
                            <tr key={Absensi.id}>
                                <Td>{Absensi.username}</Td>
                                <Td>{Absensi.date}</Td>
                                <Td>{Absensi.status}</Td>
                                <Td>
                                    <Button onClick={() => handleUpdateAbsensi(Absensi.id, 'Present')}>Present</Button>
                                    <Button onClick={() => handleUpdateAbsensi(Absensi.id, 'Absent')}>Absent</Button>
                                    <Button onClick={() => handleDeleteAbsensi(Absensi.id)}>Delete</Button>
                                </Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default AbsensiPage;
