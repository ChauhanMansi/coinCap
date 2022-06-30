import React from 'react'
import './Coin.css';

var pev_values = [];

const Coin = ({ rank, name, symbol, price, volume, priceChange, marketcap, gain }) => {
   pev_values.push({symbol: price});

  return (
        <div className={"coin-row "  + (gain === 0 ? '' : gain === 1? 'positive': 'negative')}>
            <div className='rank'>{rank}</div>
            <div className='coin'>
                <h1>{name}</h1>
                <p className='coin-symbol'>{symbol}</p>
            </div>
            <div className='coin-data'>
                <div className="coin-price " > ${parseFloat(price).toFixed(2)}</div>
                <div className='coin-marketcap'>
                    ${parseFloat(marketcap).toFixed(2)}
                </div>
                <div>
                {priceChange < 0 ?(
                    <p className='coin-percent red'>{parseFloat(priceChange).toFixed(2)}%</p>
                ) : (
                    <p className='coin-percent green'>{parseFloat(priceChange).toFixed(2)}%</p>
                )}
                </div>
                <div className='coin-volume'>${parseFloat(volume).toFixed(2)}</div>
                
            </div>
        </div>
  )
}

export default Coin;

