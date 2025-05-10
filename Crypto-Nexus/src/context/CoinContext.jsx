import { Children, createContext, useEffect, useState } from "react";

export const CoinContext=createContext()

const CoinContextProvider=({children})=>{

    const [allCoins,setAllCoins]=useState([]);
    const [currency,setCurrency]=useState({
        name:"inr",
        symbol:"₹"
    })

    const fetchAllCoins=async()=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              'x-cg-demo-api-key': 'CG-Xe1W9umkPRR2YGdgiPGCk8B1'
            }
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(res => res.json())
            .then(res => setAllCoins(res))
            .catch(err => console.error(err));
    }

    useEffect(()=>{
        fetchAllCoins();
    },[currency])

    const contextValue={
        allCoins,setCurrency,currency 
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {children}
        </CoinContext.Provider>
    )
}
export default CoinContextProvider;