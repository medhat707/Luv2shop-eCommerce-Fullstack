export default  {

    production: false,
    oidc: {
        clientId: '{0oam4etperapcC6wS5d7}',
        issuer: 'https://dev-89404996.okta.com/oauth2/default',
        redirectUri: 'http://localhost:4200/login/callback',
        scopes: ['openid' , 'profile' , 'email']
    }

}
