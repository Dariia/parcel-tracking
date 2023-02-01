import { Order, OrderArticle, OrderCheckpoint, OrderCourier } from "./orders";

export interface OrderServiceFetchOrderParams {
  zip: string;
  code: string;
}

export interface OrderDTO {
  _id: string;
  courier: OrderCourier;
  tracking_number: string;
  created: string;
  updated: string;
  checkpoints: OrderCheckpoint[],
  delivery_info: {
    articles: OrderArticle[],
    orderNo: string;
    order_date: string;
    recipient: string;
    recipient_notification: string;
    email: string;
    street: string;
    city: string;
    region: string;
    timezone: string;
    announced_delivery_date: string;
  },
  destination_country_iso3: string;
  zip_code: string;
}

export interface OrderService {
  fetchOrder(params: OrderServiceFetchOrderParams): Promise<Order>;
}
