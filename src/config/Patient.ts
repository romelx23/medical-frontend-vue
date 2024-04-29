import { toast } from "vue-sonner";
import { baseUrl } from ".";
import { IPatientResponse, IPatientsResponse } from "../types/patient";
// import { Iauth } from "../interfaces/auth";

export const registerPatient = async (values: any) => {
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

export const getPatient = async (id?: string) => {
  try {
    const url = `${baseUrl}/api/patients/${id}`;
    const resp = await fetch(`${url}`);
    const data = (await resp.json()) as IPatientResponse;
    return data.data;
  } catch (error) {
    console.error("Error getting patients: ", error);
    return null;
  }
};

export const getPatients = async (name?: string, page?: string) => {
  try {
    // const url = name
    //   ? `${baseUrl}/api/patients?q=${name}`
    //   : `${baseUrl}/api/patients`;

    let url = new URL(`${baseUrl}/api/patients`);

    if (name) {
      url = new URL(`${baseUrl}/api/patients?q=${name}`);
    }

    if (page) {
      url.searchParams.append("page", page);
    }

    const resp = await fetch(`${url}`);
    const data = (await resp.json()) as IPatientsResponse;
    return data;
  } catch (error) {
    console.error("Error getting patients: ", error);
    return null;
  }
};

export const updatePatient = async (values: any, id: string) => {
  try {
    const resp = await fetch(`${baseUrl}/api/patients/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        doctor_id: values.doctor || null,
      }),
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

export const deletePatient = async (id: string) => {
  try {
    const resp = await fetch(`${baseUrl}/api/patients/${id}`, {
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
