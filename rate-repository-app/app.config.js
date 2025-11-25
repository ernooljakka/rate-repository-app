import 'dotenv/config';

export default {
  name: 'rate-repository-app',
  // rest of the configuration...
  extra: {
    env: process.env.ENV,
    apolloUri: process.env.APOLLO_URI,
  },
};
