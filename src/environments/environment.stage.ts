// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

const baseUrl = 'http://localhost:4200';

export const environment = {
    production: false,
    application: {
        baseUrl,
        name: 'Cazel',
        logoUrl: '',
    },
    oAuthConfig: {
        issuer: 'https://localhost:44355',
        redirectUri: baseUrl,
        clientId: 'Cazel_App',
        responseType: 'code',
        scope: 'offline_access openid profile role email phone Cazel',
        requireHttps: true
    },
    apis: {
        default: {
            url: 'https://localhost:44355',
            rootNamespace: "Cazel",
        },
    },
    useHash: false,
    hmr: false,
    googleMapsApiKey: '',
    backend: baseUrl
} as any;
