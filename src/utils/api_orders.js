import axios from "axios";

import { API_URL } from "./constants";

export const getOrders = async () => {
  const response = await axios.get(API_URL + "orders");
  return response.data;
};
export const createOrder = async (
  customerName,
  customerEmail,
  products,
  totalPrice
) => {
  const response = await axios.post(API_URL + "orders", {
    customerName: customerName,
    customerEmail: customerEmail,
    products: products,
    totalPrice, // short hand
  });

  return response.data;
};

export const updateOrder = async (_id, status) => {
  const response = await axios.put(API_URL + "orders/" + _id, {
    _id: _id,
    status: status,
  });
  return response.data;
};

export async function deleteOrder(_id) {
  const response = await axios.delete(API_URL + "orders/" + _id);
  return response.data;
}
