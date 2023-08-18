const path = {
  /* Authenticate */
  login: "/auth/login",
  register: "/auth/register",
  home: "/home",
  store: "/store",
  manager: "/store/manager",
  managerDrink: "/store/manager/drink",
  managerfood: "/store/manager/food",
  registerSrore: "/store/register",
} as const;

export default path;
