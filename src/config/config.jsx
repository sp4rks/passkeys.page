function onSigninCallback () {
  window.history.replaceState(
    {},
    document.title,
    window.location.pathname
  );
}

const Config = {
  oidc: {
    authority: process.env.REACT_APP_AUTHORITY,
    client_id: process.env.REACT_APP_CLIENTID,
    redirect_uri: process.env.REACT_APP_REDIRECTURI,
    scope: "openid profile p1:create:device p1:read:device p1:update:device p1:delete:device",
    skipUserInfo: true,
    onSigninCallback: onSigninCallback
  },
  logoUrl: "https://cdn.glitch.global/b2c32b66-c81e-44db-add1-e0ac2a743e65/PIC-Horizontal-Logo-White.png?v=1697089517698",
  envId: process.env.REACT_APP_ENVID,
  signoutRedirectURI: process.env.REACT_APP_SIGNOUTREDIRECTURI
};

export default Config;