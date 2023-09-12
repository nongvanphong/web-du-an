const path = {
  /* Authenticate */
  login: "/auth/login",
  loginEmail: "/auth/login/email",
  loginPhoneNumber: "/auth/phone",
  register: "/auth/register",
  home: "/home",
  store: "/store",
  manager: "/store/manager",
  managerDrink: "/store/manager/drink",
  managerListDrink: "/store/manager/list",
  managerfood: "/store/manager/food",
  registerSrore: "/store/register",
  premissions: "/error/403",
  notfial: "/error/404",
} as const;

export default path;
