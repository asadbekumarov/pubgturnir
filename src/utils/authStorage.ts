// Utility functions for managing authentication data in localStorage

export interface StoredUser {
  id: string;
  email: string;
  pubgId: string;
  region: string;
}

export const authStorage = {
  // Save user data to localStorage
  saveUser: (user: StoredUser): void => {
    try {
      localStorage.setItem("user", JSON.stringify(user));
      console.log("✅ User data saved to localStorage:", user);
    } catch (error) {
      console.error("❌ Failed to save user data to localStorage:", error);
    }
  },

  // Get user data from localStorage
  getUser: (): StoredUser | null => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        console.log("✅ User data loaded from localStorage:", user);
        return user;
      }
      return null;
    } catch (error) {
      console.error("❌ Failed to load user data from localStorage:", error);
      return null;
    }
  },

  // Save token to localStorage
  saveToken: (token: string): void => {
    try {
      localStorage.setItem("token", token);
      console.log("✅ Token saved to localStorage");
    } catch (error) {
      console.error("❌ Failed to save token to localStorage:", error);
    }
  },

  // Get token from localStorage
  getToken: (): string | null => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        console.log("✅ Token loaded from localStorage");
        return token;
      }
      return null;
    } catch (error) {
      console.error("❌ Failed to load token from localStorage:", error);
      return null;
    }
  },

  // Clear all auth data from localStorage
  clearAuth: (): void => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      console.log("✅ Auth data cleared from localStorage");
    } catch (error) {
      console.error("❌ Failed to clear auth data from localStorage:", error);
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = authStorage.getToken();
    const user = authStorage.getUser();
    return !!(token && user);
  },

  // Get all stored auth data for debugging
  getAuthData: () => {
    return {
      token: authStorage.getToken(),
      user: authStorage.getUser(),
      isAuthenticated: authStorage.isAuthenticated(),
    };
  },
};
