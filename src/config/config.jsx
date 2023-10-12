function onSigninCallback () {
  window.history.replaceState(
    {},
    document.title,
    window.location.pathname
  );
}

const Config = {
  oidc: {
    authority: "https://auth.pingone.asia/21be67a7-c745-4934-b6a4-6a35c918ce6a/as",
    client_id: "96024a44-b9a8-4d1b-9757-9459397c7fdb",
    redirect_uri: "https://apac-spa.glitch.me/",
    scope: "openid profile newscope",
    skipUserInfo: true,
    onSigninCallback: onSigninCallback
  },
  logoUrl: "https://cdn.glitch.global/b2c32b66-c81e-44db-add1-e0ac2a743e65/PIC-Horizontal-Logo-White.png?v=1697089517698",
  envId: "21be67a7-c745-4934-b6a4-6a35c918ce6a",
  projectName: "apac-spa"
};

export default Config;