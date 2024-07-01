import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

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

const Heading = styled.h2`
    color: #FFFF00;
    font-size: 34px;
    margin-bottom: 20px;
    text-align: center;
`;

const Wrapper = styled.div`
    position: relative;
    margin: 20px auto 0;
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
    background: #fff ;
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 5px;
    color: black ;
    font-size: 16px;
    &:focus {
        outline: none;
        border: 1px solid #fff;
        background: transparent;
    }
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

const RegisterLink = styled.p`
    color: #fff;
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
`;

const Login = ({ setLoggedInUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');
        axios.post('http://localhost:5000/users/login', { username, password })
            .then(response => {
                if (response.data.message === 'Login successful') {
                    alert('Login successful');
                    setLoggedInUser({ username, role: response.data.role }); // Save username and role
                    if (response.data.role === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/employee');
                    }
                } else {
                    setError('Invalid credentials');
                }
            })
            .catch(error => {
                console.error("There was an error logging in the user!", error);
                setError('Username or password wrong');
            });
    };

    return (
        <Container>
            <Heading>Menyederhanakan Manajemen Kepegawaian Anda</Heading>
            <Wrapper>
                <Title>Login</Title>
                <Form onSubmit={handleSubmit}>
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
                    <Button type="submit">Login</Button>
                </Form>
                <RegisterLink>
                    Don't have an account? <Link to="/register">Register here</Link>
                </RegisterLink>
            </Wrapper>
        </Container>
    );
}

export default Login;
