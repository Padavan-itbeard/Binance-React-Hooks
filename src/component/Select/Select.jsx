import React, { useState } from 'react';
import OrderBook from '../OrderBook/OrderBook';

const Select = () => {
  const optionsPair = ['ETC/USDT', 'XRP/USDT', 'BTS/USDT'];
  const optionsInterv = ['1000ms', '100ms'];
  const [pair, setPair] = useState('');
  const [interval, setInterval] = useState('1000ms');

  return (
    <div style={{ textAlign: 'center' }}>
      <span>Выберите пару: </span>
      <select
        value={pair}
        onChange={(event) => setPair(event.target.value)}
      >
        <option value="" disabled>
          ...
        </option>
        {optionsPair
          && optionsPair.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
      <span style={{ marginLeft: '1rem' }}>Задайте интервал обновления: </span>
      <select
        value={interval}
        onChange={(event) => setInterval(event.target.value)}
      >
        {optionsInterv
          && optionsInterv.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
      {pair && <OrderBook pair={pair} interval={interval} />}
    </div>
  );
};

export default Select;
