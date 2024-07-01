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

const CutiPage = () => {
    const [cutiList, setCutiList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [tanggalCuti, setTanggalCuti] = useState('');
    const [tanggalMasuk, setTanggalMasuk] = useState('');
    const [alasan, setAlasan] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCutiList();
    }, []);

    const fetchCutiList = () => {
        axios.get('http://localhost:5000/cuti/cuti')
            .then(response => {
                setCutiList(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the Cuti list!', error);
                setLoading(false);
            });
    };

    const handleCreateCuti = (e) => {
        e.preventDefault();
        if (!username || !tanggalCuti || !tanggalMasuk || !alasan || !status) {
            setError('Please fill in all fields');
            return;
        }
        axios.post('http://localhost:5000/cuti/cuti', { username, tanggal_cuti: tanggalCuti, tanggal_masuk: tanggalMasuk, alasan, status })
            .then(response => {
                fetchCutiList();
                setUsername('');
                setTanggalCuti('');
                setTanggalMasuk('');
                setAlasan('');
                setStatus('');
                setError('');
            })
            .catch(error => {
                console.error('There was an error creating the Cuti!', error);
                setError('There was an error creating the Cuti');
            });
    };

    const handleUpdateCuti = (id, newStatus) => {
        axios.put(`http://localhost:5000/cuti/cuti/${id}`, { status: newStatus })
            .then(response => {
                fetchCutiList();
            })
            .catch(error => {
                console.error('There was an error updating the Cuti!', error);
            });
    };

    const handleDeleteCuti = (id) => {
        axios.delete(`http://localhost:5000/cuti/cuti/${id}`)
            .then(response => {
                fetchCutiList();
            })
            .catch(error => {
                console.error('There was an error deleting the Cuti!', error);
            });
    };

    return (
        <Container>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Cuti Management</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form onSubmit={handleCreateCuti}>
                <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    type="date"
                    placeholder="Tanggal Cuti"
                    value={tanggalCuti}
                    onChange={(e) => setTanggalCuti(e.target.value)}
                />
                <Input
                    type="date"
                    placeholder="Tanggal Masuk"
                    value={tanggalMasuk}
                    onChange={(e) => setTanggalMasuk(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Alasan"
                    value={alasan}
                    onChange={(e) => setAlasan(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <SubmitButton type="submit">Add Cuti</SubmitButton>
            </Form>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <Th>Username</Th>
                            <Th>Tanggal Cuti</Th>
                            <Th>Tanggal Masuk</Th>
                            <Th>Alasan</Th>
                            <Th>Status</Th>
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {cutiList.map(cuti => (
                            <tr key={cuti.id}>
                                <Td>{cuti.username}</Td>
                                <Td>{cuti.tanggal_cuti}</Td>
                                <Td>{cuti.tanggal_masuk}</Td>
                                <Td>{cuti.alasan}</Td>
                                <Td>{cuti.status}</Td>
                                <Td>
                                    <Button onClick={() => handleUpdateCuti(cuti.id, 'Approved')}>Approve</Button>
                                    <Button onClick={() => handleUpdateCuti(cuti.id, 'Rejected')}>Reject</Button>
                                    <Button onClick={() => handleDeleteCuti(cuti.id)}>Delete</Button>
                                </Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default CutiPage;
