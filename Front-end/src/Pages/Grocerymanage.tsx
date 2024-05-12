import  {  useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Grocerymanage() {
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const location = useLocation();
    const {  id, image } = location.state;

    const updateDetails = () => {
        axios.post(`http://localhost:8000/api/v1/admin/updateitems`, {
            id,
            price,
            quantity
        })
        .then((response) => {
            console.log(response.data);
            alert("Item updated successfully");
        })
        .catch((error) => {
            console.error('Error updating item: ', error);
        });
    }

    return (
        <div className='w-full flex justify-center align-center flex-col'>
            <h1 className="text-white m-5 p-5 text-xl">Grocery Management</h1>
            <div className='flex align-middle justify-center flex-col  w-72 ml-36'>
                <img src={image} alt="grocery item" className="rounded-xl ml-16" style={{ height: "100px", width: "150px" }} />

                <input type="text" placeholder="Enter Quantity" onChange={(e) => setQuantity(Number(e.target.value))} className="m-2 p-2 border border-gray-300 rounded" />
                <input type="text" placeholder="Enter Price" onChange={(e) => setPrice(Number(e.target.value))} className="m-2 p-2 border border-gray-300 rounded" />
                <button onClick={updateDetails} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">Update Item</button>
            </div>
        </div>
    )
}

export default Grocerymanage;
