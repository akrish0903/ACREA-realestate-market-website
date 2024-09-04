import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'


createRoot(document.getElementById('root')).render(

  //scrit mode runs app two times for safety checks
  // <StrictMode>
    <App />
  // </StrictMode>

)
