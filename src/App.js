import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import Coin from './Coin';
import logo from '../src/crypto-logo.jpg'




function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch]= useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(response =>{
      setCoins(response.data);
    })
    .catch(error=>console.log(error));
  },[]);

  const handleChange = e =>{
    setSearch(e.target.value)
  }

  const coinSearch = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )


  return (
    <div className="App">
      <div className="coin-search">
        <img src={logo}></img>
        <form>
          <input type="text" 
          placeholder="Search" 
          className="coin-input" 
          onChange={handleChange}/>
        </form>
      </div>
      {coinSearch.map(coin =>{
        return(
          <Coin 
          key={coin.id} 
          name={coin.name} 
          image={coin.image}
          symbol={coin.symbol}
          price={coin.current_price}
          marketcap={coin.market_cap}
          priceChange={coin.price_change_percentage_24h}
          volume={coin.total_volume}
          />
        )
      })}
    </div>
  );
}

export default App;
