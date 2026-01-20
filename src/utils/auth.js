import api from "./api";

// Register user
export const registerUser = async (name, email, password) => {
  try {
    const res = await api.post("/auth/register", { name, email, password });
    console.log("Registered:", res.data);
    return res.data;
  } catch (err) {
    console.error(err.response?.data || err);
    throw err;
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    console.log("Logged in:", res.data);
    return res.data; // contains accessToken + role
  } catch (err) {
    console.error(err.response?.data || err);
    throw err;
  }
};
