import axios from "axios";
axios.defaults.withCredentials = true;

export const createJob = async (jobData: any) => {
  return await axios.post("/api/job/create", jobData);
};

export const updateJob = async (jobData: any, id: string | undefined) => {
  return await axios.patch(
    `/api/job/update/${id}`,
    jobData
  );
};

export const deleteJob = async (id: string | undefined) => {
  return await axios.delete(`/api/job/${id}`);
};
