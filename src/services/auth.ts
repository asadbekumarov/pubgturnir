import apiClient from "../lib/apiClient";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  pubgId: string;
  region: string;
};

export type AuthResponse = {
  token?: string;
  data?: {
    token?: string;
  };
  user?: {
    id: string;
    email: string;
    pubgId: string;
    region: string;
  };
  message?: string;
};

export const authApi = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const res = await apiClient.post("/web/v1/auth/login", payload);
    return res.data;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const res = await apiClient.post("/web/v1/auth/register", payload);
    return res.data;
  },
};
