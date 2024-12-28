// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

// const Final = () => {
//   <div>
//     <Header />
//     <App />
//     <Footer />
//   </div>
// }

createRoot(document.getElementById('root')).render( 
  <div>
    <Header />
    <App />
    <Footer />
  </div>
)
