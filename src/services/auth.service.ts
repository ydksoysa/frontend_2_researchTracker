/*import axiosInstance from '../api/axiosInstance';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const login = async (data: LoginRequest): Promise<string> => {
  const res = await axiosInstance.post<LoginResponse>('/auth/login', data);
  return res.data.token;
};

export const signup = async (data: { username: string; password: string; role?: string }) => {
  await axiosInstance.post('/auth/signup', data);
};*/   


import axiosInstance from '../api/axiosInstance';

export interface SignupRequest {
  username: string;
  password: string;
  role: string;
}

export const signup = async (data: SignupRequest) => {
  const res = await axiosInstance.post('/auth/signup', data);
  return res.data; // returns "User registered successfully"
};

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const login = async (data: LoginRequest): Promise<string> => {
  const res = await axiosInstance.post<LoginResponse>('/auth/login', data);
  return res.data.token;
};

