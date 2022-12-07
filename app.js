
const Api = require('claudia-api-builder');
const api = new Api();

const userTransactions = require("./handlers/userTransactions");
const allTransactions = require("./handlers/allTransactions");
const buyBitcoin = require("./handlers/buyBitcoin");
const sellBitcoin = require("./handlers/sellBitcoin");
const setStatus = require("./handlers/setStatus");
const sendMail = require("./handlers/sendMail");

api.get("/transactions/user-transactions", (request) => {
  return userTransactions(request);
});

api.get("/transactions/all-transactions", (request) => {
  return allTransactions(request);
});

api.post("/transactions/buy-bitcoin", (request) => {
  return buyBitcoin(request);
});

api.post("/transactions/sell-bitcoin", (request) => {
  return sellBitcoin(request);
});

api.post("/transactions/set-status", (request) => {
  return setStatus(request);
});

api.post("/transactions/send-mail", (request) => {
  return sendMail(
    request.body.email,
    request.body.name, 
    request.body.fullFormat);
});

module.exports = api;
