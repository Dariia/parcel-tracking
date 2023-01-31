import React, { Dispatch, SetStateAction, useContext } from 'react';
import { Order } from "../types/orders";

export type OrderDataContextType = Order | null;

export const OrderDataContext = React.createContext<{
  orderData: OrderDataContextType;
  setOrderData: Dispatch<SetStateAction<OrderDataContextType>>;
}>({
  orderData: null,
  setOrderData: (value) => value,
});

export const useOrderDataContext = () => useContext(OrderDataContext);
