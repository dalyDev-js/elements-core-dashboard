import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api",
  timeout: 30000,
  headers: { "Content-Type": "application.json" },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    console.log(
      `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(
      `✅ API Response: ${response.config.method?.toUpperCase()} ${
        response.config.url
      }`
    );
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("❌ API Error:", {
        status: error.response.status,
        message: error.response.data?.error || error.response.statusText,
        url: error.config?.url,
      });

      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          console.error("Unauthorized - Session expired or not logged in");
          // Optionally redirect to login
          // window.location.href = "/api/auth/login";
          break;
        case 403:
          console.error(
            "Forbidden - You don't have permission for this action"
          );
          break;
        case 404:
          console.error("Resource not found");
          break;
        case 500:
          console.error("Server error - please try again later");
          break;
      }
    } else if (error.request) {
      console.error("❌ No response from server:", error.message);
    } else {
      console.error("❌ Request failed:", error.message);
    }

    return Promise.reject(error);
  }
);
