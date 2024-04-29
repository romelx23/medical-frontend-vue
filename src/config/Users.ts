import { toast } from "vue-sonner";
import { baseUrl } from ".";
import { IRolesResponse, IUserResponse, IUsersResponse } from "../types/user";

export const getUsers = async (name?: string, page?: string) => {
  try {
    // const url = name
    //   ? `${baseUrl}/api/patients?q=${name}`
    //   : `${baseUrl}/api/patients`;

    let url = new URL(`${baseUrl}/api/users`);

    if (name) {
      url = new URL(`${baseUrl}/api/users?q=${name}`);
    }

    if (page) {
      url.searchParams.append("page", page);
    }

    const resp = await fetch(`${url}`);
    const data = (await resp.json()) as IUsersResponse;
    return data;
  } catch (error) {
    console.error("Error getting patients: ", error);
    return null;
  }
};

export const getUser = async (id?: string) => {
  try {
    const url = `${baseUrl}/api/users/${id}`;
    const resp = await fetch(`${url}`);
    const data = (await resp.json()) as IUserResponse;
    console.log(data);
    return data.user;
  } catch (error) {
    console.error("Error getting doctors: ", error);
    return null;
  }
};

export const getRoles = async () => {
  try {
    const url = `${baseUrl}/api/roles`;
    const resp = await fetch(`${url}`);
    const data = (await resp.json()) as IRolesResponse;
    console.log(data);
    return data.roles;
  } catch (error) {
    console.error("Error getting doctors: ", error);
    return null;
  }
};

export const updateUser = async (values: any, id: string) => {
  try {
    const resp = await fetch(`${baseUrl}/api/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...values,
      }),
    });

    const data = await resp.json();

    if (data.status === 400) {
      toast.error(data.message);
      return null;
    }

    toast.success("User updated successfully");
    return data;
  } catch (error) {
    console.error("Error updating patient: ", error);
    toast.error("Error updating patient");
    return null;
  }
};
