import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { OrderApiClient } from './OrderApiClient';
import orderMock from '../mocks/orders.json';
import {ORDERS_URL} from "./mocks/OrderServiceMock";

describe('Order Api Client', () => {
  let axiosMock: MockAdapter;
  let orderApiClient: OrderApiClient;

  axiosMock = new MockAdapter(axios);
  const axiosInstance = axios.create();

  beforeAll(() => {
    orderApiClient = new OrderApiClient(axiosInstance);
  });

  afterEach(() => {
    axiosMock.reset();
  });

  describe('Fetch order', () => {
    it('success', async () => {
      const ordersUrl = new RegExp(`${ORDERS_URL}*`);
      const axiosMockGet = jest.fn<any[], []>(() => [200, orderMock[0]]);
      axiosMock.onGet(ordersUrl).reply(axiosMockGet);
      const data = await orderApiClient.fetchOrder({ zip: '55555', code: '66666' });
      expect(data).toEqual({
        checkpoints: orderMock[0].checkpoints,
        articles: orderMock[0].delivery_info.articles
      });
    });

    it('not found', async () => {
      const ordersUrl = new RegExp(`${ORDERS_URL}*`);
      const axiosMockGet = jest.fn<any[], []>(() => [404]);
      axiosMock.onGet(ordersUrl).reply(axiosMockGet);
      const  res = orderApiClient.fetchOrder({ zip: '55555', code: '66666' });
      await expect(res).rejects.toThrow('Request failed with status code 404');
    });
  });

  it('should be singleton', async () => {
    const newInstance = new OrderApiClient(axiosInstance);
    expect(newInstance === orderApiClient).toBeTruthy();
  });
});
