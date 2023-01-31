import axios from "axios";
import { isMockOrderAPI } from '../../utils/config';
import {getOrderResponse, ORDERS_URL} from "./OrderServiceMock";
import AxiosMockAdapter from 'axios-mock-adapter';

if (isMockOrderAPI) {
  const axiosMockAdapterInstance = new AxiosMockAdapter(axios, { delayResponse: 1500 });
  const ordersUrl = new RegExp(`${ORDERS_URL}*`);

  axiosMockAdapterInstance
    .onGet(ordersUrl).reply(getOrderResponse)
    .onAny()
    .passThrough();
}
