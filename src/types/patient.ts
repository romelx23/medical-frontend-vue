export interface IPatientsResponse {
  status: number;
  message: string;
  patients: IPatient[];
  total: number;
  page: number;
  pages: number;
}

export interface IPatientResponse {
  status: number;
  message: string;
  data: IPatient;
}

export interface IPatient {
  id: number;
  name: string;
  age?: number;
  address: string;
  email: string;
  phone: string;
  description: string;
  doctor_id?: number;
}

export interface IDoctorsResponse {
  status: number;
  message: string;
  patients: IDoctor[];
  page: number;
  total: number;
}

export interface IDoctorResponse {
  status: number;
  message: string;
  data: IDoctor;
}

export interface IDoctor {
  id: number;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  specialization: string;
  sub_specialization: string;
}
