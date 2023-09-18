const path = {
  /* Authenticate */
  login: "/elephan/auth/login",
  loginEmail: "/elephan/auth/login/email",
  loginPhoneNumber: "/elephan/auth/login/phone",
  register: "/elephan/auth/register",
  home: "/elephan/home",
  product: "/elephan/product",
  AddProduct: "/elephan/product/add",
  updateProduct: "/elephan/product/update",
  pay: "/elephan/pay",
  chart: "/elephan/chart",

  store: "/elephan/store",
  manager: "/elephan/store/manager",
  managerDrink: "/elephan/store/manager/drink",
  managerListDrink: "/elephan/store/manager/list",
  managerfood: "/elephan/store/manager/food",
  registerSrore: "/elephan/store/register",
  premissions: "/elephan/error/403",
  notfial: "/elephan/error/404",
  serverError: "/elephan/error/500",
} as const;

export default path;
