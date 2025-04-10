         
<img src='./app/assets/logo-colour1.png' style='filter: brightness(0.75)'>

A Paper Trading application focused on learning the fundamentals of stocks and shares trading with a built in social messaging platform. Built with React Native + Expo, Powered by Firebase.

# Tech Stack

- **Expo + React Native** *(Front-End Mobile Application)*
- **Firebase Auth & Firestore** *(User Authentication and Cloud Database Storage)*
- **ExpressJS** *(Order Processing Server)*

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

## Issues & Troubleshooting

- Issues relating to the app not starting in Expo Go are usually related to network settings

### Differing IP addresses (Expo)

Potential issue includes metro waiting on a different IP address from IPv4 local device. To fix, from within windows powershell (as administrator) run:

```bash
# setx to use same ip after reboot
setx /M REACT_NATIVE_PACKAGER_HOSTNAME <IPv4-Address>
```

```bash
# set used for only one session
set REACT_NATIVE_PACKAGER_HOSTNAME=<IPv4-Address>
```

> To check IPv4 Address in windows, navigate to terminal and use `ipconfig` to find listed IPv4 address

### Using a Proxy Server as a development server (Expo)

Network related issues can be avoided using a third-party proxy server (though this comes with it's own drawbacks so should be a last resort). This is achieved using **tunnelling**.

```bash
# Run expo app
npx expo start

# Run expo app using tunnelling
npx expo start --tunnel
```

### Unable to resolve/find `@09jayy/StockApiCaller` npm module in server

If the npm package is no longer available on npm, this repo contains the npm package code in the `shared/StockApiCaller` directory. 
- From within `server/package.json`, switch the version of the npm package to the shared/StockApiCaller directory.

```diff
"dependencies": {
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "firebase-admin": "^13.2.0",
    "node-cron": "^3.0.3",
-     "@09jayy/stockapicaller": "^2.1.0"
+     "@09jayy/stockapicaller": "file:../shared/stockapicaller/stockapicaller-2.1.0.tgz"
  }
```

### Unable to resolve/find StockApiCaller in Expo Application

The expo app uses the .tgz of the npm package. If this does not exist you can either switch it to the published npm package or use `npm pack` to create the .tgz file. 

From within `app/package.json`, switch the version of the npm package to the .tgz file from in the shared/StockApiCaller directory.

```bash
cd shared/StockApiCaller
npm pack
```

*OR*

Alternatively, from within `app/package.json`, set stockapicaller value to `@09jayy/StockApiCaller`

```diff
    "react-native-screens": "~4.4.0",
-    "stockapicaller": "file:../shared/stockapicaller/stockapicaller-2.1.0.tgz"
+    "stockapicaller": "@09jayy/StockApiCaller"
  },
```