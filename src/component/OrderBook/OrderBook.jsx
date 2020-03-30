import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchLoad, fetchError } from '../actions/actions';
import './OrderBook.css';

const OrderBook = () => {
  const pair = useSelector((state) => state.pair);
  const currPair = pair.replace(/[/]/g, '');
  const currencyArray = pair.split('/');
  const interval = useSelector((state) => state.interval);
  const isLoad = useSelector((state) => state.isLoad);
  const isError = useSelector((state) => state.isError);
  const Err = useSelector((state) => state.Err);
  const dispatch = useDispatch();
  const str = 'https://cors-anywhere.herokuapp.com/';
  const [orders, setOrders] = useState([]);
  let index = 0;

  useEffect(() => {
    setOrders([]);
    dispatch(fetchLoad(true));
    dispatch(
      fetchError({
        isError: false,
        Err: '',
      }),
    );
    const fetchLoadData = async () => {
      const url = `${str}https://www.binance.com/api/v1/depth?symbol=${currPair}&limit=10`;
      try {
        const res = await axios.get(url);
        setOrders(res.data);
        dispatch(fetchLoad(false));
      } catch (error) {
        dispatch(fetchLoad(false));
        dispatch(
          fetchError({
            isError: true,
            Err: error.message,
          }),
        );
      }
    };
    fetchLoadData();
  }, [pair]);

  // useEffect(() => {
  //   const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${currencyPair}@depth10@${interval}`);

  //   ws.onmessage = (event) => {
    //     const res = JSON.parse(event.data);
    //     setOrders(res);
    //   };
    //   // Выбивает в ошибку при переходе на др пару или интервал
    //   // ws.onerror = (error) => {
      //   //   console.log('error>', error);
      //   // };
      //   return () => {
  //     ws.close();
  //   };
  // }, [currencyPair, interval]);

  
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
          Amount (
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
      {isLoad && <h2>Loading...</h2>}
      {isError ? (
        <>
          <h2>Что то пошло не так..</h2>
          <p>
            Error:
            {Err}
          </p>
        </>
      ) : (
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
      )}
    </>
  );
};

export default OrderBook;
