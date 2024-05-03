
import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import  User  from './Pages/User.tsx'
import Navbar from './Pages/nav.tsx'
import LoginPage from './Pages/LoginPage.tsx'
import RegisterPage from './Pages/RegisterPage.tsx'
import Cart from './Pages/Cart.tsx'

const router = createBrowserRouter([
  { path: '/login', element:<> <LoginPage/> </>},
  {path: '/', element: <><Navbar /><User /></>},
  {path: '/register', element: <><RegisterPage/></>},
  {path: '/cart', element: <><Navbar /><Cart /></>},
])

function App() {
  

  return (
    <div className='bg-black p-9 rounded-xl'>
      <RouterProvider router={router} />
      
      
        
      
    </div>
  )
}

export default App
