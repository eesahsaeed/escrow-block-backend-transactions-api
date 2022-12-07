
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const isAuthenticated = require("./isAuthenticated");
const isAdmin = require("./isAdmin");

async function allTransactions(request){
  try{
    let user = await isAuthenticated(request);
    let admin = isAdmin(user);

    if (user && admin){
      const params = {
        TableName: "transactions-table"
      };

      let transactions = await docClient.scan(params).promise();
      return transactions.Items;
    } else {
      return {
        error: "You are not authorized to make this request"
      }
    }
  } catch(err){
    console.log(err);
  }
}

module.exports = allTransactions;
