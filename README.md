# Trading-Dojo

A Paper Trading application focused on learning the fundamentals of stocks and shares trading with a built in social messaging platform. Built with React Native + Expo, Powered by Firebase

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

## Issues & Troubleshooting

- Issues relating to the app not starting in Expo Go are usually related to network settings

### Differing IP addresses

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
