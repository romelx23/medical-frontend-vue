import { authStore } from "../store/authStore";

export const isRoleAdmin = async (to: any, from: any, next: any) => {
  const authContext = authStore();
  const user = authContext.user;

  console.log(user);
  const isAdmin = user?.role === "admin";
  console.log({ isAdmin });
  if (!isAdmin) {
    console.log("User is not admin");
    next("/dashboard");
  } else {
    console.log("User is admin");
    next();
  }
};

export const isRoleAdminOrDoctor = async (to: any, from: any, next: any) => {
  const authContext = authStore();
  const user = authContext.user;

  console.log(user);
  const isAdmin = user?.role === "admin" || user?.role === "doctor";
  console.log({ isAdmin });
  if (!isAdmin) {
    console.log("User is not admin");
    next("/dashboard");
  } else {
    console.log("User is admin");
    next();
  }
};
