# Order Server

Used adding and processing stock limit and market orders. Server is used to create a hybrid approach for this repo rather than a serverless as order processing is nessesary when the user application is not running, therefore requiring a server. A 'serverless' approach however is still used in the user application for authentication, logins and sign up.  

> Ensure to follow the dev instructions for this server found in the repository [README.md](../README.md) for settings up .env and service account key .json before running the server. 

## BASE URL 
`http://localhost:3000/` or `http://<IPv4-Address>:3000/`

localhost will not work if the expo application development server is running on a different machine. To retrieve your IPv4-Address, in windows use `ipconfig` in your terminal to find it.  
A GET request at this Base URL should response with a 200 status code return 'Hello World!' to test the connection.  

## REST Endpoints

### GET `/stock/:stockSymbol`
Retrieve the stock key stats via yahoo finance

### POST `/order`
```
Content-Type: application/json
body: {
    "shareQuantity": number,
    "userId": string, 
    "stockSymbol": string, 
    "tradeType": "buy" | "sell"
}
```
Send stock order data to add a new order to user account. (At time of writing, server only processes market orders, limit orders have not been completed/tested). 

