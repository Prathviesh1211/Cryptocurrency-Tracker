import React, { useContext } from 'react'
import './Navbar.css'
// import logo from '../../assets/logo (1).png'
// import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
  
  const {setCurrency}=useContext(CoinContext)

  const currencyHandler=(e)=>{
     switch (e.target.value){
      case "inr":{
        setCurrency({name:'inr',symbol:"₹"});
        break;
      };
      case "usd":{
        setCurrency({name:"usd",symbol:"$"});
        break;
      };
      case "eur":{
        setCurrency({name:"eur",symbol:"€"});
        break;
      };
      default:{
        setCurrency({name:'inr',symbol:"₹"});
        break;
      };
      
    }

  }

  return (
    <div className='navbar'>
        <Link to={'/'}>
        {/* <img
  src={logo}
  alt="CryptoNexus"
  style={{ height: '40px', width: 'auto' }}
/>     */}
          <h1>CryptoNexus</h1>
        </Link >

        <ul>
            <Link to={'/'}><li>Home</li></Link>
            <li>Features</li>
            <li>Pricing</li>
            <li>Blog</li>
        </ul> 
        <div className='nav-right'>
            <select onChange={currencyHandler}>
                <option value="inr">INR</option>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
            </select>
            <button>Sign Up <img src={arrow_icon} alt="" /></button>
        </div>
    </div>
  )
}

export default Navbar
