import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchLoad, fetchError } from '../actions/actions';
import './OrderBook.css';

const OrderBook = () => {
  const { pair, interval, isLoad, isError, Err } = useSelector((state) => state);
  const currPair = pair.replace(/[/]/g, '');
  const currArray = pair.split('/');
  const dispatch = useDispatch();
  const str = 'https://cors-anywhere.herokuapp.com/';
  const [orders, setOrders] = useState([]);
  let index = 0;

  // на Thunk или Saga`у переносить не вижу смысла
  // так же могу в промисах then, catch
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
      } catch (error) {
        dispatch(
          fetchError({
            isError: true,
            Err: error.message,
          }),
        );
      } finally {
        dispatch(fetchLoad(false));
      }
    };
    fetchLoadData();
  }, [pair]);

  useEffect(() => {
    // тут вопрос, если снапшот в ошибку вывалился, вебсокеты запускаем?
    // если нет, то тут просто if (isError)
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${currPair.toLowerCase()}@depth10@${interval}`);

    ws.onopen = () => {
      dispatch(
        fetchError({
          isError: false,
          Err: '',
        }),
      );
    };
    ws.onmessage = (event) => {
      const res = JSON.parse(event.data);
      setOrders(res);
    };
    // Выбивает в ошибку при переходе на др пару или интервал
    // пробовал ставить паузу(была мысль, не успевает расконектится)
    // не помогло
    ws.onerror = (error) => {
      dispatch(
        fetchError({
          isError: true,
          Err: error.message,
        }),
      );
    };
    return () => {
      ws.close();
    };
  }, [currPair, interval]);

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
          {currArray[0]}
          )
        </th>
        <th>
          Price (
          {currArray[1]}
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
