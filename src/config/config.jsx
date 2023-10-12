function onSigninCallback () {
  window.history.replaceState(
    {},
    document.title,
    window.location.pathname
  );
}

const Config = {
  oidc: {
    authority: "https://auth.pingone.asia/7bfecfd9-e298-40e1-acfd-17c534439272/as",
    client_id: "e22c5537-1f46-45e9-8639-251fdf923d69",
    redirect_uri: "https://royal-oceanic-cookie.glitch.me/",
    scope: "openid profile",
    skipUserInfo: true,
    onSigninCallback: onSigninCallback
  },
  logoUrl: "https://cdn.glitch.global/b2c32b66-c81e-44db-add1-e0ac2a743e65/PIC-Horizontal-Logo-White.png?v=1697089517698",
  envId: "7bfecfd9-e298-40e1-acfd-17c534439272",
  projectName: "apac-spa"
};

export default Config;