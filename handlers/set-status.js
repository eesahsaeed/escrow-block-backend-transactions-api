
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const isAuthenticated = require("./isAuthenticated");
const isAdmin = require("./isAdmin");

async function setStatus(request){
  try{
    let user = await isAuthenticated(request);
    let admin = isAdmin(user);
    let {status, id} = request.body;

    if (user && admin){
      let userParams = {
        TableName: "transactions-table",
        Key: {
          id: id
        },
        UpdateExpression: `set 
          currentStatus = :currentStatus
        `,
        ExpressionAttributeValues: {
          ":currentStatus": status
        }
      };

      await docClient.update(userParams).promise()

      return {success: "successfully updated transaction status", currentStatus: status};
    } else {
      return {
        error: "You are not authorized to make this request"
      }
    }
  } catch(err){
    console.log(err);
  }
}

module.exports = setStatus;
