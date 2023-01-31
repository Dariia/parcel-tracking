import orderMock from '../../mocks/orders.json';
import { AxiosRequestConfig } from "axios";
import { OrderDTO, OrderServiceFetchOrderParams } from "../../types/orderServiceClient";
import { HttpStatusCode } from "../../types/api";
export const ORDERS_URL = '/orders/';

const getOrderByTrackingCode = ({ code }: Pick<OrderServiceFetchOrderParams, 'code'>): OrderDTO | undefined =>
  (orderMock as OrderDTO[]).find(({ tracking_number } ) => code === tracking_number);

export const getOrderResponse = (config: AxiosRequestConfig) => {
  const code = (config.url || '').replace(ORDERS_URL, '');
  const data = getOrderByTrackingCode({ code });
  return data ? [HttpStatusCode.Ok, data] : [HttpStatusCode.NotFound];
};
