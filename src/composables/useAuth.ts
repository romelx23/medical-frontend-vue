import { ref } from "vue";
import { toast } from "vue-sonner";
import { baseUrl } from "../config";
import { useRouter } from "vue-router";
import { IUser, IUserResponse } from "../types/user";

export const useAuth = () => {
  const user = ref<IUser | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  const router = useRouter();

  const login = async (values: any) => {
    console.log({ values });
    try {
      const resp = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      console.log({ resp });

      const data = (await resp.json()) as IUserResponse;

      console.log({ data });

      if (resp.status === 401) {
        console.log(JSON.stringify(data.errors));
        toast.error(data.message);
        return null;
      }

      if (resp.status === 400) {
        console.log(JSON.stringify(data.errors));
        toast.error(data.message, {
          // description: data?.errors?.email[0] || "Error logging in",
          description: "Error logging in",
        });
        error.value = "Error logging in";
        return null;
      }

      console.log({ data });

      localStorage.setItem("token", data.access_token);
      user.value = data.user;

      toast.success("Logged successfully");
      return data;
    } catch (error) {
      console.error("Error registering patient: ", error);
      toast.error("Error registering patient");
      return null;
    }
  };

  const logout = async () => {
    try {
      const resp = await fetch(`${baseUrl}/api/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      localStorage.removeItem("token");
      console.log({ data });
      toast.success("Logout successfully");
      return data;
    } catch (error) {
      console.error("Error logging out: ", error);
      toast.error("Error logging out");
      return null;
    }
  };

  const register = async (values: any) => {
    console.log({ values });
    try {
      const resp = await fetch(`${baseUrl}/api/patients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      console.log({ resp });

      const data = await resp.json();

      console.log({ data });

      if (data.status === 400) {
        console.log(JSON.stringify(data.errors));
        toast.error(data.message, {
          description: data.errors.email[0],
        });
        return null;
      }

      toast.success("Patient registered successfully");
      return data;
    } catch (error) {
      console.error("Error registering patient: ", error);
      toast.error("Error registering patient");
      return null;
    }
  };

  // watch(user, () => {
  //   console.log({ user: user.value });
  //   router.push("/dashboard");
  // });

  return { user, error, loading, login, logout, register };
};
