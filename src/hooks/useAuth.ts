import { useMutation } from "@tanstack/react-query";
import { authApi, LoginPayload, RegisterPayload } from "../services/auth";

export function useLogin(
  onSuccess?: (data: unknown) => void,
  onError?: (err: unknown) => void
) {
  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (data) => {
      const token = (data as any)?.token;
      if (token) localStorage.setItem("token", token);
      onSuccess?.(data);
    },
    onError,
  });
}

export function useRegister(
  onSuccess?: (data: unknown) => void,
  onError?: (err: unknown) => void
) {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess,
    onError,
  });
}
