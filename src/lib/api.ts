import auth from "../firebase/firebase.init";

const BASE_URL = "http://localhost:3000/api";

interface ApiOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
}

export const apiFetch = async (endpoint: string, options: ApiOptions = {}) => {
  const token = await auth.currentUser?.getIdToken();

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  // Handle 204 No Content (DELETE responses)
  if (res.status === 204) return null;

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
