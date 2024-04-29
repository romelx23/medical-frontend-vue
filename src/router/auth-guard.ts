// import { useAuth } from "../composables/useAuth";

import { authStore } from "../store/authStore";

export const isAuthenticated = async (to: any, from: any, next: any) => {
  // const { user } = useAuth();
  const authContext = authStore();
  const user = authContext.user;
  // const user = await authContext.refreshToken();

  console.log(user);
  const isLoggedIn = user !== null;
  console.log({ isLoggedIn });
  if (!isLoggedIn) {
    console.log("User is not logged in");
    next("/login");
  } else {
    console.log("User is logged in");
    next();
  }
};

export const isLogged = async (to: any, from: any, next: any) => {
  // const { user } = useAuth();
  const authContext = authStore();
  // const user = authContext.user;
  const user = await authContext.refreshToken();

  console.log(user);
  const isLoggedIn = user !== null;
  console.log({ isLoggedIn });
  if (isLoggedIn) {
    console.log("User is logged in");
    next("/dashboard");
  } else {
    console.log("User is not logged in");
    next();
  }
};
