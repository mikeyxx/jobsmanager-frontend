import axios from "axios";
axios.defaults.withCredentials = true;

export const onRegistration = async (registrationData: any) => {
  return await axios.post(
    "/api/register",
    registrationData
  );
};

export const onLogin = async (loginData: any) => {
  return await axios.post("/api/login", loginData);
};

export const onLogout = async () => {
  return await axios.get("/api/logout");
};
