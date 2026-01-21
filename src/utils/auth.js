import api from "./api";

// Register user
export const registerUser = async (name, email, password, org_id, role) => {
  try {
    const res = await api.post("/api/auth/register", {
      name,
      email,
      password,
      org_id,
      role
    });

    console.log("Registered:", res.data);
    return res.data;
  } catch (err) {
    console.error(err.response?.data || err);
    throw err;
  }
};

// Login user
export const loginUser = async (email, password, org_id) => {
  try {
    const res = await api.post("/api/auth/login", { email, password, org_id });
    console.log("Logged in:", res.data);
    return res.data; // contains accessToken + role
  } catch (err) {
    console.error(err.response?.data || err);
    throw err;
  }
};

// ✅ Logout user
export const logoutUser = async () => {
  try {
    await api.post("/api/auth/logout"); // refreshToken cleared via cookie
    localStorage.removeItem("accessToken");
  } catch (err) {
    console.error("Logout error:", err);
  }
};
