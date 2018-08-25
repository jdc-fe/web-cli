const env = process.env.WEB_ENV || 'integration';

export const domains = {
  production: {
    icity: 'http://101.124.15.81'
  },
  integration: {
    icity: 'http://101.124.15.81'
  }
}[env];
