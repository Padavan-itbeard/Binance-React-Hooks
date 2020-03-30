import React, { useState, useEffect } from 'react';
import './OrderBook.css';
import PropTypes from 'prop-types';

const OrderBook = ({ pair, interval }) => {
  const [orders, setOrders] = useState([]);
  const currencyPair = pair.replace(/[/]/g, '').toLowerCase();
  const currencyArray = pair.split('/');
  let index = 0;

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${currencyPair}@depth10@${interval}`);

    ws.onmessage = (event) => {
      const res = JSON.parse(event.data);
      setOrders(res);
    };
    // Выбивает в ошибку при переходе на др пару или интервал
    // ws.onerror = (error) => {
    //   console.log('error>', error);
    // };
    return () => {
      ws.close();
    };
  }, [currencyPair, interval]);

  const { bids, asks, lastUpdateId } = orders;

  const orderRows = (arr) => arr
    && arr.map((item) => (
      <tr key={index++}>
        <td>{item[1]}</td>
        <td>{item[0]}</td>
      </tr>
    ));

  const orderHead = (title) => (
    <thead>
      <tr>
        <th colSpan="2">{title}</th>
      </tr>
      <tr>
        <th>
          Quantity (
          {currencyArray[0]}
          )
        </th>
        <th>
          Price (
          {currencyArray[1]}
          )
        </th>
      </tr>
    </thead>
  );

  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        lastUpdateId:
        {lastUpdateId}
      </div>
      <div className="order-container">
        <table>
          {orderHead('Bids')}
          <tbody>{orderRows(bids)}</tbody>
        </table>
        <table>
          {orderHead('Asks')}
          <tbody>{orderRows(asks)}</tbody>
        </table>
      </div>
    </>
  );
};

OrderBook.propTypes = {
  pair: PropTypes.string.isRequired,
  interval: PropTypes.string.isRequired,
};

export default OrderBook;
