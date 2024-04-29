import { toast } from "vue-sonner";
import { baseUrl } from ".";
import { IDoctorResponse, IDoctorsResponse } from "../types/patient";
// import { Iauth } from "../interfaces/auth";

export const registerDoctor = async (values: any) => {
  console.log({ values });
  try {
    const resp = await fetch(`${baseUrl}/api/doctors`, {
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

export const updateDoctor = async (values: any, id: string) => {
  try {
    const resp = await fetch(`${baseUrl}/api/doctors/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await resp.json();

    if (data.status === 400) {
      toast.error(data.message);
      return null;
    }

    toast.success("Patient updated successfully");
    return data;
  } catch (error) {
    console.error("Error updating patient: ", error);
    toast.error("Error updating patient");
    return null;
  }
};

export const getDoctor = async (id?: string) => {
  try {
    const url = `${baseUrl}/api/doctors/${id}`;
    const resp = await fetch(`${url}`);
    const data = (await resp.json()) as IDoctorResponse;
    return data.data;
  } catch (error) {
    console.error("Error getting doctors: ", error);
    return null;
  }
};

export const getDoctors = async (name?: string) => {
  try {
    const url = name
      ? `${baseUrl}/api/doctors?q=${name}`
      : `${baseUrl}/api/doctors`;
    const resp = await fetch(`${url}`);
    const data = (await resp.json()) as IDoctorsResponse;
    return data;
  } catch (error) {
    console.error("Error getting doctors: ", error);
    return null;
  }
};

export const deleteDoctor = async (id: string) => {
  try {
    const resp = await fetch(`${baseUrl}/api/doctors/${id}`, {
      method: "DELETE",
    });

    const data = await resp.json();

    if (data.status === 400) {
      toast.error(data.message);
      return null;
    }

    toast.success("Patient deleted successfully");
    return data;
  } catch (error) {
    console.error("Error deleting patient: ", error);
    toast.error("Error deleting patient");
    return null;
  }
};

// export const login = async (values: Iauth) => {
//   try {
//     const resp = await fetch(`${baseUrl}/api/login`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(values),
//     });

//     const data = await resp.json();

//     if (data.errors) {
//       toast.error(data.errors.email[0]);
//       return null;
//     }

//     if (data.status === 400) {
//       toast.error(data.message);
//       return null;
//     }

//     localStorage.setItem("token", data.token);

//     toast.success("Login successful");
//     return data;
//   } catch (error) {
//     console.error("Error logging in: ", error);
//     toast.error("Error logging in");
//     return null;
//   }
// };

// export const logout = () => {
//   localStorage.removeItem("token");
//   toast.success("Logout successful");
// };
