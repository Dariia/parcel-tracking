export enum OrderStatus {
  registered = "Registered",
  newDeliveryDate = "New delivery date set",
  delivered = "Delivered",
  inTransit = "In transit",
  failedDelivery = "Failed delivery attempt",
  ready = "Ready for collection",
}

export type OrderCourier = "dhl" | "ups";

export interface OrderArticle {
  articleNo: string;
  articleName: string;
  articleImageUrl: string | null;
  quantity: number;
  price: number;
}

export interface OrderCheckpoint {
  status_details: string;
  event_timestamp: string;
  status: OrderStatus;
  country_iso3: string;
  meta?: {
    delivery_date?: string;
    delivery_time_frame_from?: string;
    delivery_time_frame_to?: string;
    pickup_address_map_url?: string;
    pickup_address_link?: string;
    pickup_address?: string;
  },
  city: string;
}

export interface Order {
  checkpoints: OrderCheckpoint[],
  articles: OrderArticle[],
}

