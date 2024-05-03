import axios from 'axios';
import  { useState } from 'react';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const onsubmit = (e:any) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/v1/register', {
            username: name,
            
            password
        }).then((response) => {
            console.log(response.data);
            setTimeout(() => {
                alert("User registered successfully");
               window.location.href = '/login'; 
            }, 2000);
        }).catch((error) => {
            console.error('Error registering user: ', error);
            alert("Error registering user");
        });

    }

    return (
        
        <div className="flex justify-center items-center h-screen flex-col">
            <h1 className='text-white py-4 text-xl text-white py-4 text-xl'> Register User</h1>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline align-middle"
                        onClick={(e)=>onsubmit(e)}
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;