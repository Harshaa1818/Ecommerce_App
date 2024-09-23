import { useEffect, useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

interface CartItem {
    id: number;
    groceryItemId: number;
    quantity: number;
}

interface EcommerceItem {
    id: number;
    name: string;
    image: string;
    price: number;
}

function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [ecommerceCards, setEcommerceCards] = useState<EcommerceItem[]>([]);
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        
        axios.post<{ items: CartItem[] }>('http://localhost:8000/api/v1/user/ViewCartItems', { username: localStorage.getItem('user') })
            .then((response: AxiosResponse<{ items: CartItem[] }>) => {
                setCartItems(response.data.items);
                console.log(response.data.items);
            })
            .catch((error: AxiosError) => {
                console.error('Error fetching cart items: ', error);
            });

            axios.get<{ items: EcommerceItem[] }>('http://localhost:8000/api/v1/user/viewitems')
            .then((response: AxiosResponse<{ items: EcommerceItem[] }>) => {
                setEcommerceCards(response.data.items);
            })
            .catch((error: AxiosError) => {
                console.error('Error fetching grocery items: ', error);
            });
        
        
    }, []);

   const handleDeleteFromCart = (cartItemId: number) => {
        axios.post('http://localhost:8000/api/v1/user/DeleteCartItems', { id: cartItemId })
            .then((response: AxiosResponse) => {
                console.log(response.data);
                alert("Item deleted from cart successfully");
                window.location.reload();

            })
            .catch((error: AxiosError) => {
                console.error('Error deleting item from cart: ', error);
            });
    }

    const handleDecrement = (cartItemId: number) => {
        if (quantity === 0) {
            handleDeleteFromCart(cartItemId);
            return;
        }
        setQuantity(quantity - 1);
        axios.post('http://localhost:8000/api/v1/user/updateCartItems', { id: cartItemId, quantity: quantity })
            .then((response: AxiosResponse) => {
                console.log(response.data);
                alert("Item quantity updated successfully");
            })
            .catch((error: AxiosError) => {
                console.error('Error updating item quantity: ', error);
            });
        
    }
    const handleIncrement = (cartItemId: number) => {
        setQuantity(quantity + 1);
        axios.post('http://localhost:8000/api/v1/user/updateCartItems', { id: cartItemId, quantity: quantity })
            .then((response: AxiosResponse) => {
                console.log(response.data);
                alert("Item quantity updated successfully");
                
            })
            .catch((error: AxiosError) => {
                console.error('Error updating item quantity: ', error);
            });
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">Cart Items</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cartItems.map((cartItem: CartItem) => {
                    
                    const matchingItem = ecommerceCards.find((item: EcommerceItem) => item.id === cartItem.groceryItemId);
                    if (matchingItem) {
                        return (
                            <div key={cartItem.id} className="bg-white p-6 rounded-lg shadow-md">
                                <img src={matchingItem.image} alt={matchingItem.name} className="w-full h-40 object-cover mb-4 rounded-lg" />
                                <h2 className="text-xl font-semibold mb-2">{matchingItem.name}</h2>
                                <p className="text-gray-600">₹{matchingItem.price}</p>
                                <div className="flex gap-3 items-center justify-center">
                                <button className='px-2 bg-black text-white rounded-md align-middle' onClick={()=>{handleDecrement(cartItem.id)}}>-</button>

                                <p className="text-gray-600">Quantity: {quantity}</p>
                                <button className='px-2 bg-black text-white rounded-md' onClick={() => handleIncrement(cartItem.id)}>+</button>
                                </div>
                                <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg mt-4" onClick={() => handleDeleteFromCart(cartItem.id)}>Delete from Cart</button>
                            
                            
                            
                            </div>
                            

                        );
                    } else {
                        return null; // If no matching item found, don't render anything
                    }
                })}
            </div>
        </div>
    );
}

export default Cart;
