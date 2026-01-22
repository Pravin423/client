import api from "./api";

export const fetchMyProfile = async () => {
  const token = localStorage.getItem("accessToken");

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
};
