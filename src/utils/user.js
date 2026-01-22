import api from "./api";

import Router from "next/router";

export const fetchMyProfile = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    const { data } = await api.post(
      "/api/users/me",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      localStorage.removeItem("accessToken");
      Router.replace("/login");
    }
    throw err;
  }
};
