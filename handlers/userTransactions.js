
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const isAuthenticated = require("./isAuthenticated");

async function userTransactions(request){
  try{
    let user = await isAuthenticated(request);

    if (user){
      const params = {
        TableName: "transactions-table",
        FilterExpression: "ownedBy = :id",
        ExpressionAttributeValues: {
          ":id": user.id
        }
      };

      let transactions = await docClient.scan(params).promise();
      return transactions.Items;
    }
  } catch(err){
    console.log(err);
  }
}

module.exports = userTransactions;
