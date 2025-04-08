// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: 'Trading Dojo',
    slug: 'trading-dojo',
    extra: {
      fireBaseKey: process.env.FIREBASE_KEY,
      projectId: process.env.PROJECT_ID,
      authDomain: process.env.AUTH_DOMAIN,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      alpacaApiKey: process.env.ACA_API_KEY,
      alpacaSecretKey: process.env.ALPACA_SECRET_KEY
    },
  },
};