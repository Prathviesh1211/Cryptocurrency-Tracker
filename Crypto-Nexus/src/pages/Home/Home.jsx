import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import {CoinContext} from '../../context/CoinContext'
import {Link} from 'react-router-dom'

const Home = () => {

  const {currency,allCoins}=useContext(CoinContext);
  const [displayCoins,setDisplayCoins]=useState([]);
  const [input,setInput]=useState("")


  const inputHandler=(e)=>{
    setInput(e.target.value)
    if(e.target.value===""){
      setDisplayCoins(allCoins)
    }
  }

  const searchHandler=async(e)=>{
    e.preventDefault();
    const data=await allCoins.filter((item)=>{
      return item.name.toLowerCase().includes(input.toLowerCase());
    })
    setDisplayCoins(data)
  }

  useEffect(()=>{
    setDisplayCoins(allCoins)
  },[allCoins])

  return (
    <div className="home">
      <div className="hero">
        <h1>Largest <br />Crypto Marketplace</h1>
        <p>
          Welcome to the world's largest cryptocurrency 
          marketplace. Sign up to explore more about Cryptos.
        </p>
        <form onSubmit={searchHandler}>
          <input onChange={inputHandler} list='coinlist' type="text" placeholder='Search crypto...' />

          <datalist id='coinlist'>
            {allCoins.map((item,ind)=>(<option key={ind} value={item.name}/>))}
          </datalist>

      
          <button type='submit'>Seacrh</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coin</p>
          <p>Price</p>
          <p style={{textAlign:"center"}}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>

        {
          displayCoins.slice(0,10).map((item,idx)=>(
            <Link to={`/coin/${item.id}`} className="table-layout" key={idx}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
                <p>{item.name+" - "+item.symbol}</p>
               </div>
               {/* <p>{currency.symbol} {item.current_price}</p> */}
               <p>{currency.symbol} {item.current_price.toLocaleString()}</p>


               <p className={item.price_change_percentage_24h>=0?"green":"red"}>
                {Math.floor(item.price_change_percentage_24h*100)/100}</p>
               {/* <p style={{ color: item.price_change_percentage_24h >= 0 ? "green" : "red" }}>
  {item.price_change_percentage_24h.toFixed(2)}%
</p> */}
                <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>

            </Link>
          ))
        }

      </div>
    </div>
  )
}

export default Home
