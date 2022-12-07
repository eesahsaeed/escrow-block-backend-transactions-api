
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const {v4} = require("uuid");
const nodemailer = require("nodemailer");

const isAuthenticated = require("./isAuthenticated");

async function buyBitcoin(request){
  try{
    const body = request.body;
    const user = await isAuthenticated(request);
    console.log("user", user);

    let userTransactions = JSON.parse(user.transactions);

    if (user){
      let id = v4();
      let transactions = JSON.stringify([...userTransactions, id]);
      console.log("transacts raw", transactions)

      await docClient.put({
        TableName: "transactions-table",
        Item: {
          ...body,
          ownedBy: user.id,
          id,
          currentStatus: "pending",
          transactionType: "buying"
        }
      }).promise();

      let userParams = {
        TableName: "users-table",
        Key: {
          id: user.id
        },
        UpdateExpression: `set 
          transactions = :transactions
        `,
        ExpressionAttributeValues: {
          ":transactions": transactions
        }
      };

      await docClient.update(userParams).promise()
      .then(function(data){
        console.log(data)
        return data;
      }).catch(function(err){
        console.log(err)
        return err;
      });

      return {success: true};
    } else {
      return {
        error: "User must be authenticated"
      }
    }
  } catch(err){
    console.log(err);
    return err;
  }
}

module.exports = buyBitcoin;
