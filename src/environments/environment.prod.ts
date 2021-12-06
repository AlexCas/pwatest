const baseUrl = '';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Cazel',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: '',
    redirectUri: baseUrl,
    clientId: 'Cazel_App',
    responseType: 'code',
    scope: 'offline_access openid profile role email phone Cazel',
    requireHttps: true
  },
  apis: {
    default: {
      url: '',
      rootNamespace: "Cazel",
    },
  },
  useHash: false,
  hmr: false,
  googleMapsApiKey: '',
  backend: baseUrl,
  envConfig: '/assets/config/app-prod-env.json',
} as any;
