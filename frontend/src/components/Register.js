// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('${process.env.PUBLIC_URL}/pegawai.png');
    background-repeat: no-repeat;
    background-size: cover;
    flex-direction: column;
`;

const Wrapper = styled.div`
    position: relative;
    width: 285px;
    padding: 25px;
    background: rgba(255, 255, 255, .13);
    border-radius: 10px;
    color: #fff;
    box-shadow: 0px 0px 16px 9px rgba(0,0,0,0.07);
`;

const Title = styled.h1`
    font-size: 30px;
    margin-bottom: 20px;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    padding: 14px 10px;
    margin-bottom: 15px;
    background: #fff;
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 5px;
    color: black;
    font-size: 16px;
    &:focus {
        outline: none;
        border: 1px solid #fff;
        background: transparent;
    }
`;

const Heading = styled.h2`
    color: #FFFF00;
    font-size: 34px;
    margin-bottom: 20px;
    text-align: center;
`;

const Button = styled.button`
    padding: 15px 12px;
    margin-bottom: 0;
    background-color: white;
    color: #black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    text-transform: uppercase;
    &:hover {
        background-color: #FFFF00;
    }
`;

const ErrorMsg = styled.p`
    color: #ff6347;
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
`;

const LoginLink = styled.p`
    color: #fff;
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
`;

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/users/register', { username, password, role });
            if (response && response.data && response.data.message === 'User registered successfully') {
                alert('User registered successfully');
                navigate('/login');
            } else {
                alert('User registration failed');
            }
        } catch (error) {
            console.error('Error registering user', error);
            setError('User registration failed');
        }
    };

    return (
        <Container>
            <Heading>Menyederhanakan Manajemen Kepegawaian Anda</Heading>
            <Wrapper>
                <Title>Register</Title>
                <Form onSubmit={handleRegister}>
                    {error && <ErrorMsg>{error}</ErrorMsg>}
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Input
                        as="select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="karyawan">Karyawan</option>
                    </Input>
                    <Button type="submit">Register</Button>
                </Form>
                <LoginLink>
                    Already have an account? <Link to="/login">Login here</Link>
                </LoginLink>
            </Wrapper>
        </Container>
    );
};

export default Register;
