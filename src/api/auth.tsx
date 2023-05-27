import axios from "axios";
axios.defaults.withCredentials = true;

export const onRegistration = async (registrationData: any) => {
  return await axios.post(
    "http://localhost:4000/api/register",
    registrationData
  );
};

export const onLogin = async (loginData: any) => {
  return await axios.post("http://localhost:4000/api/login", loginData);
};

export const onLogout = async () => {
  return await axios.get("http://localhost:4000/api/logout");
};
