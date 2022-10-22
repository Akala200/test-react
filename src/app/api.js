import axios from "axios";

const apiURL = 'http://localhost:3094/api/aggregate';
const username = '3442f8959a84dea7ee197c632cb2df15';
const password = '13023';
function getUsers() {

  const token = `${username}:${password}`;
  const encodedToken = Buffer.from(token).toString('base64');
const response = axios.get(`${apiURL}/order_items?limit=30`, {headers: { 'Authorization': 'Basic '+ encodedToken }});

  console.log(response);
  return response;
}


function getUpdatedUser(id, user) {
  const token = `${username}:${password}`;
  const encodedToken = Buffer.from(token).toString('base64');
  const response = axios.put(`${apiURL}/order_items/${user.seller_id}`, {
    freight_value: user.freight_value,
    order_id: user.order_id,
    order_item_id: user.order_item_id,
    price: user.price,
    product_id: user.product_id,
    seller_id: user.seller_id,
    shipping_limit_date: user.shipping_limit_date,
  }, {headers: { 'Authorization': 'Basic '+ encodedToken }});

  return response;
}

function getDeletedUser(user) {
  const token = `${username}:${password}`;
  const encodedToken = Buffer.from(token).toString('base64');
  const response = axios.delete(`${apiURL}/order_items/${user.seller_id}`, {headers: { 'Authorization': 'Basic '+ encodedToken }});

  return response;
}

export { getUsers, getUpdatedUser, getDeletedUser };
