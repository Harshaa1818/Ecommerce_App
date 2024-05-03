import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/outline';


interface LocalStorageItems {
    token: string;
    user: string | null;
    role: string | null;
}

const Navbar = () => {
    const [user] = useState<string | null>(localStorage.getItem('user'));
    const [showCart, setShowCart] = useState<boolean>(false);
    const [role, setRole] = useState<string | null>(localStorage.getItem('role'));

    useEffect(() => {
        
        const localStorageData = localStorage as unknown as LocalStorageItems;
        if (localStorageData.role) {
            setRole(localStorageData.role);
        }
    }, []);


    const handleLogout = () => {
        if (user) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('role');
            window.location.href = '/';
        }
    }

    const toggleCart = () => {
        setShowCart(!showCart);
    }

    return (
        <div className='flex justify-between my-6'>
            <div>
                <Link to='/'><h1 className='text-white font-bold font-mono text-xl'>My Grocery Store</h1></Link>
            </div>
            
            <div className="flex items-center">
                {user && role !== 'admin' &&
                    <div className="relative">
                        <Link to="/cart">
                            <div className='bg-white p-2 rounded-xl'>
                                <ShoppingCartIcon className="h-5 w-5 cursor-pointer z-5" onClick={toggleCart} />
                            </div>
                        </Link>
                    </div>
                }

                <div className="login-button text-black bg-white rounded-lg text-center p-2 px-3 ml-4" onClick={handleLogout}>
                    <Link to="/login">{user ? "Logout" : "Login"}</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
