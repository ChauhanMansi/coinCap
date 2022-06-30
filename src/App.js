import React from 'react';
import axios from 'axios';
import { useState , useEffect } from 'react';
import Coin from './Coin';
import './App.css'
import logo from './download.png';

function App() {

const[coins, setCoins] = useState();
const [search, setSearch] = useState('');

useEffect(() => {
  
 api_call();
},[]);

const api_call =  () => {
  axios
  .get('https://api.coincap.io/v2/assets')
  .then(res => {
    setCoins(res.data);
    process_data(res.data);
    setTimeout(api_call , 2000);
  })
  .catch(error => console.log(error))
}

async function process_data(newData){
  // Try to retrieve coins data from local storage
  const oldData = await JSON.parse(localStorage.getItem('coins_data'));

  // If local data exsts? 
  if(oldData){
    
    // For every coin, compare priceUsd
    for(var i=0; i< oldData.data.length; i++){
       if(parseFloat(oldData.data[i].priceUsd) === parseFloat(newData.data[i].priceUsd)){
         newData.data[i]["gain"] = 0;
       }
       else if (parseFloat(oldData.data[i].priceUsd) < parseFloat(newData.data[i].priceUsd)){
        newData.data[i]["gain"] = 1;
       }else{
        newData.data[i]["gain"] = -1;
       }
    }
    
  }
  // setCoins(newData);
  await JSON.parse(localStorage.setItem('coins_data', JSON.stringify(newData)));
}

const handleChange = e => {
  setSearch(e.traget.value)
}

if (typeof coins !== 'undefined'){
console.log(coins.data);
var filteredCoin = coins.data.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));
return (
  <div className="coin-app">
    <div className='coin-search'>
      <div className='left-option'>
      <button className='button'>Coins</button>
      <button className='button'>Exchanges</button>
      <button className='button'>Swap</button>
      </div>
      <img src={logo} alt='CoinCap' />
      <div className='right-option'>
      <button className='button'>Search</button>
      <button className='button'>Setting</button>
      <button className='button-special'>Connect Wallet</button>
      </div>
    </div>
    
    <div className='color-div'>
      <div className='span-div'>
        MarketCap
        <div>$1.59T</div>
      </div>
      <div className='span-div'>
        ExchangeVolume
        <div>$60.73B</div>
      </div>
      <div className='span-div'>
        Assets
      <div>2,295</div>
      </div>
      <div className='span-div'>
        Exhanges
      <div>73</div>
      </div>
      <div className='span-div'>
        Volume
      <div>15,886</div>
      </div>
      <div className='span-div'>
        BTC DOM Index
      <div>35.9%</div>
      </div>
    </div>
    <div className='coin-container-outer'>
     <div className='header'>
        <div>Rank</div>
        <div>Name</div>
        <div>Price</div>
        <div>Market Cap</div>
        <div>Price Change</div>
        <div>Volume</div>       
      </div>
      {filteredCoin.map ( coin => {
        return(
          <Coin 
          key ={coin.id} 
          rank = {coin.rank}
          name ={coin.name} 
          symbol = {coin.symbol}
          marketcap = {coin.marketCapUsd}
          price = {coin.priceUsd}
          priceChange = {coin.changePercent24Hr}
          volume = {coin.volumeUsd24Hr}
          gain = {coin.gain ? coin.gain : 0}
          />
        );
      })}
    </div>
    <div className='footer-container'>
      <div className='footer-div'>
      <div className='labels'>
        <div className='label'>COINCAP.IO</div>
        <div>
          <p>Methodology</p>
          <p>Support</p>
          <p>Our API</p>
          <p>Rate Comparisons</p>
          <p>Careers</p>
        </div>
        </div>
        <div className='foot-container labels'>
        <div className='row-div'>
        <div className='label'>LEGALS</div>
        <div>
          <p>Terms Of Service</p>
          <p>Privacy Policy</p>
         </div>
       </div>
       <div>
         <div className='label'>DISCLAIMER</div>
         <p className='wrap'>Neither ShapeShift AG nor CoinCap are in any way associated with CoinMarketCap, LLC or any of its goods and services.</p>
       </div>
       </div>
          <div className='labels'>
            <div className='label'>FOLLOW US</div>
            <div>
              <p>Insta</p>
              <p>Twitter</p>
            </div>
          </div>
          <div className='labels'>
            <div className='label'>COINCAP APP AVAILABLE ON</div>
            <p>Google Play Store</p>
            <p>Apple Store</p>
          </div>
      </div>
    </div>
  </div>
 
);
}
else{
  return(
    <div></div>
  )
}
}

export default App;
