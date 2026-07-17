import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { ClerkProvider } from '@clerk/react'
import { BrowserRouter } from 'react-router'

// const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
// console.log("Clerk key:", key);

createRoot(document.getElementById('root')).render(

  <StrictMode>
    {/* <ClerkProvider publishableKey={key}></ClerkProvider> */}
      <BrowserRouter>
      <App />
      </BrowserRouter>
    
  </StrictMode>,
)
