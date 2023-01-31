import axios from "axios";
import { OrderApiClient } from "./OrderApiClient";
import { apiURL } from '../utils/config';
import './mocks';

export const orderApi = new OrderApiClient(axios.create({ baseURL: apiURL }));
