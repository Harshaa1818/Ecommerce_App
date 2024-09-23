import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ErrorBoundary } from 'react-error-boundary'
import { useErrorBoundary } from 'react-error-boundary'




const CustomComponent:React.FC = () =>{
  const { resetBoundary } = useErrorBoundary();

  return(
    <div>
      <h1>Something went Wrong!!</h1>
      <button onClick={resetBoundary}>Try again</button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<CustomComponent/>}>

   <App />
    </ErrorBoundary>
    
  </React.StrictMode>,
)