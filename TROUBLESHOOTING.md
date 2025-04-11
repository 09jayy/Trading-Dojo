# Troubleshooting & Issues

Issues relating to the app not starting in Expo Go are usually related to network settings. It is also possible that the dependencies used are not set up correctly. Or, that the dependencies are no longer available like the render.com web server, @09jayy/stockapicaller npm package or Firebase.

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