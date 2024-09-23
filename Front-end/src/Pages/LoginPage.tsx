import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        axios.post('http://localhost:8000/api/v1/login', {
            username,
            password
        }).then((response) => {
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('user', response.data.user.username);
            localStorage.setItem('role', response.data.user.role);
            
            console.log(response.data);

            setTimeout(() => {
                alert("Login successful. Redirecting to home page...");
                
                window.location.href = '/';
            }, );
        }).catch((error) => {
            alert("Invalid credentials")
            console.log(error); 
        }).finally(() => {
    
        });
    };



    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4 text-white">Login Page</h1>
            <div className="w-64">
                <input
                    type="email"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white py-2 rounded"
                >
                    Login
                </button>
                <Link to="/register" className="block text-center mt-2 text-blue-500">
                <button
                    
                    className="w-full bg-green-500 text-white py-2 rounded mt-2"
                >
                    Register
                </button>
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;