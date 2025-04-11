         
<img src='./app/assets/logo-colour1.png' style='filter: brightness(0.75)'>

A Paper Trading application focused on learning the fundamentals of stocks and shares trading with a built in social messaging platform. Built with React Native + Expo, Powered by Firebase.

![React Native Badge](https://img.shields.io/badge/React_Native-blue?style=for-the-badge&logo=react)
![Expo Badge](https://img.shields.io/badge/expo-grey?style=for-the-badge&logo=Expo)
![Firebase Badge](https://img.shields.io/badge/Firebase-red?style=for-the-badge&logo=firebase)
![Node.JS Badge](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS Badge](https://img.shields.io/badge/Express.JS-black?style=for-the-badge&logo=express)

![GitHub contributors](https://img.shields.io/github/contributors/09jayy/Trading-Dojo)
![GitHub Created At](https://img.shields.io/github/created-at/09jayy/Trading-Dojo)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/09jayy/Trading-Dojo)
![GitHub last commit](https://img.shields.io/github/last-commit/09jayy/Trading-Dojo)
![GitHub commit activity](https://img.shields.io/github/commit-activity/t/09jayy/Trading-Dojo)


# Developer Instructions

```bash
git clone https://github.com/09jayy/Trading-Dojo
cd Trading-Dojo
```    

## Running Expo Application

### 1. Set up Environment Variables

`app/.env` environment variables. Fetched from [Firebase](https://firebase.google.com/) project, Alpaca Api keys from [Alpaca](https://alpaca.markets/) 

```
FIREBASE_KEY= 
AUTH_DOMAIN=
PROJECT_ID=
STORAGE_BUCKET=
MESSAGING_SENDER_ID=
APP_ID=
ALPACA_API_KEY=
ALPACA_SECRET_KEY=
```

> Defined the variables above, followed by the corresponding key, leaving no spaces *(note: firebase environment variables auth domain is before project id in this list, make sure you paste the correct key on each line)*


### 2. Install node modules + run

```bash
cd app # if not already in /Trading-Dojo/app
npm install
npx expo start
# ... follow expo instruction
```

## Running Server Application

If the deployment of the server is unavailable on [render.com](https://render.com/), you can run server locally. (May have to change fetch requests to localhost URL or device IP from render.com deployed url) 

### 1. Set up Environment Variables

`server/.env` environment variables. Find firebase service account environment variables in *Firebase app > Project Settings > Service Accounts > Firebase Admin SDK > Generate new private key.* Paste .json data contained within quotes. E.g. `SERVICE_ACCOUNT='{"type": "service_account" ...}'` 

```
ALPACA_API_KEY=
ALPACA_SECRET_KEY= 
SERVICE_ACCOUNT='insert firebase service account admin SDK'
```

### 2. Start server using node (Local)

```bash
# in a new terminal different to the expo application
cd server
npm install
node index.js 
```

**Additional Flags**

Use `node index.js --process-limit-orders` to enable background task of server to regularly process limit orders. 

> See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for further guidance or common fixes if there are any issues encountered throughout setup.  

# Credits

## Contributors

<a href="https://github.com/09jayy/Trading-Dojo/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=09jayy/Trading-Dojo" />
</a>