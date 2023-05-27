import axios from "axios";
axios.defaults.withCredentials = true;

export const createJob = async (jobData: any) => {
  return await axios.post("http://localhost:4000/api/job/create", jobData);
};

export const updateJob = async (jobData: any, id: string | undefined) => {
  return await axios.patch(
    `http://localhost:4000/api/job/update/${id}`,
    jobData
  );
};

export const deleteJob = async (id: string | undefined) => {
  return await axios.delete(`http://localhost:4000/api/job/${id}`);
};
