import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OrderBook from '../OrderBook/OrderBook';
import { setIntrvl, setPair } from '../actions/actions';

const Select = () => {
  const optionsPair = ['ETC/USDT', 'XRP/USDT', 'BTS/USDT'];
  const optionsInterv = ['1000ms', '100ms'];
  const { pair, interval } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center' }}>
      <span>Выберите пару: </span>
      <select
        value={pair}
        onChange={(event) => dispatch(setPair(event.target.value))}
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
        onChange={(event) => dispatch(setIntrvl(event.target.value))}
      >
        {optionsInterv
          && optionsInterv.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
      {pair && <OrderBook />}
    </div>
  );
};

export default Select;
