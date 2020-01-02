const getters = {
  env: state => state.settings.env,
  apiBaseUrl: state => state.settings.apiBaseUrl,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  aesKey: state => state.app.aesKey,
  routes: state => state.app.routes,
  token: state => state.user.token,
  userid: state => state.user.userid,
  uuid: state => state.user.uuid,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  name: state => state.user.name,
  username: state => state.user.username,
  mobile: state => state.user.mobile,
  authority: state => state.user.authority,
  companyUrl: state => state.user.companyUrl
};
export default getters;
