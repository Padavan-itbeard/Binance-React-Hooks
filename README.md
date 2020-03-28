## Задание.
Необходимо сделать SPA на React + Redux, с выводом ордербука криптовалютной биржи Binance.
Принцип работы: Получить снэпшот данных, вывести его в блоки asks и bids. Инициализировать подключение по вебсокетам и настроить автоматическое обновление. Количество записей – 10.
Валютная пара: BTC-USDT
Дополнительно, если останется время:
Добавить возможность переключения валютных пар(ETC-USDT, XRP-USDT,BTS_USDT)
## Примерный вид приложения:

![Пример](https://github.com/Padavan-itbeard/Binance-React-Hooks/blob/master/public/test.jpg)


## Binance API:
https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#order-book
## Binance Socket  Streams API:
https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md

wss://stream.binance.com:9443
