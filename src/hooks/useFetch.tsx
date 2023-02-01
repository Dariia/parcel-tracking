import { useState } from "react";
import { AxiosError } from "axios";
import { Order } from "../types/orders";
import { orderApi } from "../api";
import { OrderServiceFetchOrderParams } from '../types/orderServiceClient';

const useFetch = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ fetchedData, setFetchedData ] = useState<Object | null>(null);
  const [ error, setError ] = useState<AxiosError | null>(null);

  async function fetch<ParamsType, ReturnObjectType>(query: ParamsType, service: (params: ParamsType) => Promise<ReturnObjectType>) {
    try {
      setIsLoading(true);
      const data = await service(query);
      setIsLoading(false);
      setFetchedData(data || null);
    } catch (error) {
      setIsLoading(false);
      setError(error as AxiosError);
    }
  }

  const fetchOrder = (query: OrderServiceFetchOrderParams) =>
    fetch<OrderServiceFetchOrderParams, Order>(query, orderApi.fetchOrder.bind(orderApi));

  return { isLoading, error, fetchedData, fetchOrder };
}

export default useFetch;