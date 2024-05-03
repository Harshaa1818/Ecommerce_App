import { useEffect, useState } from 'react';
import axios from 'axios';

interface EcommerceItem {
    id: number;
    name: string;
    price: number;
    image: string;
}

function User() {
    const [ecommerceCards, setEcommerceCards] = useState<EcommerceItem[]>([]);
    const [role, setRole] = useState<string>(localStorage.getItem('role') || '');
    const [showAddItemForm, setShowAddItemForm] = useState<boolean>(false);
    const [Cart, setCart] = useState<EcommerceItem[]>([]);
    const [newItem, setNewItem] = useState({
        name: '',
        price: '',
        image: ''
    });

    const handleCart = (card: EcommerceItem) => {
        setCart([...Cart, card]);
        console.log("Cart", card.id);
        axios.post('http://localhost:8000/api/v1/user/additems', { username: localStorage.getItem('user'), groceryItemId: card.id, quantity: 1 })
            .then((response) => {
                console.log(response.data);
                setTimeout(() => {
                    alert("Item added to cart");

                }, 500);
            }).catch((error) => {
                console.error('Error adding item to cart: ', error);
                alert("Error adding item to cart");
            });
        console.log("Cart", Cart);
    }

    const handleDeleteItem = (cardId: number) => {
        console.log(cardId);
        axios.post('http://localhost:8000/api/v1/admin/deleteitems', { id: cardId })
            .then((response) => {
                console.log(response.data);
                alert("Item deleted successfully");
            }).catch((error) => {
                console.error('Error deleting item: ', error);
            });
    }

    const handleAddItems = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowAddItemForm(true);
    }

    const handleSubmitNewItem = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/v1/admin/additems', {
            name: newItem.name,
            price: newItem.price,
            quantity: 10,
            image: newItem.image
        })
            .then((response) => {
                console.log(response.data);
                setShowAddItemForm(false);
                alert("Item added successfully");
            }).catch((error) => {
                console.error('Error adding item: ', error);
            });
        console.log(newItem)
    }

    useEffect(() => {
        axios.get<{ items: EcommerceItem[] }>('http://localhost:8000/api/v1/user/viewitems')
            .then((response) => {
                setEcommerceCards(response.data.items);
            }).catch((error) => {
                console.error('Error fetching data: ', error);
            });

        const userRole = localStorage.getItem('role');
        if (userRole) {
            setRole(userRole);
        }
    }, []);

    return (
        <div className="grid grid-cols-3 gap-4">
            {ecommerceCards.map((card, index) => (
                <div key={index} className="bg-white p-4 shadow rounded-lg">
                    <div>
                        <img src={card.image} alt={card.name} className="w-full h-40 object-cover mb-4 rounded-xl opacity-85" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{card.name}</h3>
                    <p className="text-gray-400">Price: ₹{card.price}</p>

                    {role === 'admin' ? (
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => handleDeleteItem(card.id)}>Delete Item</button>
                    ) : (
                        <button className="bg-black hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-xl mt-4" onClick={() => handleCart(card)}>Add to Cart</button>
                    )}
                </div>

            ))}
            {role === 'admin' && (
                <div className="bg-white p-4 shadow">
                    {showAddItemForm ? (
                        <form onSubmit={(e) => handleSubmitNewItem(e)}>
                            <h3 className="text-xl font-bold">Add Item</h3>
                            <input
                                type="text"
                                placeholder="Name"
                                value={newItem.name}
                                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                className="w-full mb-2 p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Price"
                                value={newItem.price}
                                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                className="w-full mb-2 p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={newItem.image}
                                onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                                className="w-full mb-2 p-2 border border-gray-300 rounded"
                            />
                            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">Submit</button>
                        </form>
                    ) : (
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={handleAddItems}>Add Items</button>
                    )}
                </div>
            )}
        </div>
    );
}

export default User;
