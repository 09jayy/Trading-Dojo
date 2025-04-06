# Trading-Dojo

A Paper Trading application focused on learning the fundamentals of stocks and shares trading with a built in social messaging platform. Built with React Native + Expo, Powered by Firebase

# Tech Stack

- Expo + React-Native
- Firebase-JS-SDK
- ExpressJs

# Dev instructions

```bash
git clone https://github.com/09jayy/Trading-Dojo
cd Trading-Dojo
```

## Running Expo Application

### Install node modules

```bash
cd app
npm install
```

### Start Application

```bash
cd app # if not already in /Trading-Dojo/app
npm start
# ... follow expo instructions
```

## Running Server Application

### 1. Set up environment variables
```bash
ALPACA_API_KEY='insert alpaca api key'
ALPACA_SECRET_KEY='insert alapaca secret key' 
```

### 2. Fetch the firebase firestore service account key for firebase/admin
To retrieve a new private key: In the firebase, select project, then project overview gear icon->project settings->service accounts->generate new private key. This will download a .json file.
Move this json file into folder '.../Trading-Dojo/server' and rename to 'serviceAccountKey.json'

### 3. Start server using node

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

### ENV Set up
To avoid publishing information such as API keys we use .env files to protect this data

In your app folder create a new file and name it '.env' this name should be the name in its entirety including the .file type portion
You should see a cog wheel then the name .env in your app directory now

Next open this file up and write the following

```bash
FIREBASE_KEY=
AUTH_DOMAIN=
PROJECT_ID=
STORAGE_BUCKET=
MESSAGING_SENDER_ID=
APP_ID=
```
> followed by the corresponding key, leaving no spaces (note auth domain is before project id in this list, make sure you paste the correct key on each line)