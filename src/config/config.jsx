function onSigninCallback () {
  window.history.replaceState(
    {},
    document.title,
    window.location.pathname
  );
}

const Config = {
  oidc: {
    authority: "https://auth.pingone.asia/83997d85-6acc-4093-b414-da3787662a7f/as",
    client_id: "c5508f85-3cf0-4555-b1b9-35a5650fb323",
    redirect_uri: "https://apac-spa.glitch.me/",
    scope: "openid profile",
    skipUserInfo: true,
    onSigninCallback: onSigninCallback
  },
  logoUrl: "https://apac-spa.s3.ap-southeast-2.amazonaws.com/ping.png",
  envId: "83997d85-6acc-4093-b414-da3787662a7f",
  projectName: "apac-spa"
};

export default Config;