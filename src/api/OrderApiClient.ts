import { AxiosInstance } from 'axios';
import { Order } from '../types/orders';
import { OrderService, OrderServiceFetchOrderParams, OrderDTO } from '../types/orderServiceClient';

export class OrderApiClient implements OrderService {
  private static instance: OrderApiClient;

  constructor (private axiosInstance: AxiosInstance) {
    if (!OrderApiClient.instance) {
      OrderApiClient.instance = this;
    }
    return OrderApiClient.instance;
  }

  private convertDataForClientResponse(data: OrderDTO): Order {
    const { delivery_info: { articles }, checkpoints } =  data;
    // TODO: Think about converting farther for better client response object and object names
    return {
      articles,
      checkpoints,
    };
  }

  fetchOrder({ zip, code }: OrderServiceFetchOrderParams): Promise<Order>  {
    return this.axiosInstance.get(`/orders/${code}`, { params: { zip }})
      .then((response) => this.convertDataForClientResponse(response.data))
  }
}
