const AWS = require('aws-sdk');

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();



function Crud(){}
Crud.prototype.CreateItems = async (userId, name) => {
      
      let params = {
            TableName: USERS_TABLE,
            Item: { userId: userId, name: name }
      };

      try{
            let response = await dynamoDb.put(params).promise();
            return "user successfully registered in the database";
      } catch(error){
            return error;
      }
}

Crud.prototype.ListItems = async () => {
      
      let params = {
            TableName: USERS_TABLE, // all items
            Select: "ALL_ATTRIBUTES"
      }
      let response = await dynamoDb.scan(params).promise()
      return response.Items? response.Items: "no records";
}



Crud.prototype.ListItemById = async (idItem) => {
      
      let params = {
            TableName: USERS_TABLE,
            Key: { userId: idItem},
      }
      let response = await dynamoDb.get(params).promise()
      return response.Item? response.Item : `there is no record with id  ${idItem}`;
}

module.exports = Crud;