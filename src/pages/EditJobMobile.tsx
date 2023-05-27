import { useState, FormEvent, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/store";
import { useParams, useNavigate } from "react-router-dom";
import { updateJob } from "../api/job";
import { hitReset, onSuccess } from "../features/jobs/JobSlice";

const EditJobMobile = () => {
  const singleJob = useAppSelector((state) => state.jobs.editJob);

  const [jobData, setJobData] = useState({
    company_name: "",
    job_title: "",
    job_details: "",
    job_location: "",
    salary: 0,
    job_type: "Full-time",
    status: "Open",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const charCount = 600;
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    if (name === "job_details") {
      if (charCount - value.length >= 0) {
        setJobData({
          ...jobData,
          [name]: value,
        });
      }
    } else {
      setJobData({
        ...jobData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (singleJob) {
      const {
        company_name,
        job_title,
        job_details,
        job_location,
        salary,
        job_type,
        status,
      } = singleJob;
      setJobData({
        company_name,
        job_title,
        job_details,
        job_location,
        salary: parseFloat(salary.toString().replace(/[^0-9.-]+/g, "")),
        job_type,
        status,
      });
    }
  }, [singleJob]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateJob(jobData, id);
      dispatch(onSuccess());
      reset();
      navigate("/");
    } catch (error: any) {
      console.log(error);
      setErrorMsg(error.response.data.errors[0].msg);
    }

    hideAlert();
  };

  const hideAlert = () => {
    setTimeout(() => {
      setErrorMsg("");
    }, 3000);
  };

  const reset = () => {
    setTimeout(() => {
      dispatch(hitReset());
    }, 5000);
  };

  return (
    <div>
      <div className="h-full w-full my-8 px-4">
        <section className="bg-white w-full p-4 shadow-lg relative">
          <h2 className="text-2xl font-semibold mb-20">Update</h2>
          <p
            className={
              errorMsg !== ""
                ? `bg-red-300 font-semibold rounded h-10 p-2 flex items-center justify-center absolute max-w-[50rem] top-16 createErrorMsg`
                : ""
            }
          >
            {errorMsg}
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 justify-center mt-8"
          >
            <div className="flex flex-col">
              <label htmlFor="company_name">Company Name</label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                value={jobData.company_name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="job_title">Job Title</label>
              <input
                type="text"
                id="job_title"
                name="job_title"
                value={jobData.job_title}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="job_details">Job Details</label>
              <textarea
                id="job_details"
                name="job_details"
                value={jobData.job_details}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="job_location">Job Location</label>
              <input
                type="text"
                id="job_location"
                name="job_location"
                value={jobData.job_location}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="salary">Salary</label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={jobData.salary}
                onChange={handleChange}
              />
            </div>
            <fieldset className="flex flex-col">
              <legend className="mb-4">Job Type</legend>
              <div className="flex gap-4 items-center">
                <input
                  type="radio"
                  name="job_type"
                  id="full_time"
                  value="Full-time"
                  checked={jobData.job_type === "Full-time"}
                  onChange={handleChange}
                />
                <label htmlFor="full_time">Full-time</label>
              </div>
              <div className="flex gap-4 items-center">
                <input
                  type="radio"
                  name="job_type"
                  id="intern"
                  value="Intern"
                  checked={jobData.job_type === "Intern"}
                  onChange={handleChange}
                />
                <label htmlFor="intern">Intern</label>
              </div>
              <div className="flex gap-4 items-center">
                <input
                  type="radio"
                  name="job_type"
                  id="contract"
                  value="Contract"
                  checked={jobData.job_type === "Contract"}
                  onChange={handleChange}
                />
                <label htmlFor="contract">Contract</label>
              </div>
            </fieldset>
            <fieldset className="flex flex-col">
              <legend className="mb-4">Job Status</legend>
              <div className="flex gap-4 items-center">
                <input
                  type="radio"
                  name="status"
                  id="open"
                  value="Open"
                  checked={jobData.status === "Open"}
                  onChange={handleChange}
                />
                <label htmlFor="open">Open</label>
              </div>
              <div className="flex gap-4 items-center">
                <input
                  type="radio"
                  name="status"
                  id="interview"
                  value="Interview"
                  checked={jobData.status === "Interview"}
                  onChange={handleChange}
                />
                <label htmlFor="interview">Interview</label>
              </div>
              <div className="flex gap-4 items-center">
                <input
                  type="radio"
                  name="status"
                  id="offer"
                  value="Offer"
                  checked={jobData.status === "Offer"}
                  onChange={handleChange}
                />
                <label htmlFor="offer">Offer</label>
              </div>
              <div className="flex gap-4 items-center">
                <input
                  type="radio"
                  name="status"
                  id="closed"
                  value="Closed"
                  checked={jobData.status === "Closed"}
                  onChange={handleChange}
                />
                <label htmlFor="closed">Closed</label>
              </div>
              <div className="flex gap-4 items-center">
                <input
                  type="radio"
                  name="status"
                  id="pending"
                  value="Pending"
                  checked={jobData.status === "Pending"}
                  onChange={handleChange}
                />
                <label htmlFor="pending">Pending</label>
              </div>
            </fieldset>
            <div>
              <button className="bg-blue-500 p-2 rounded-lg text-lg text-white cursor-pointer w-full mb-4">
                Update
              </button>
            </div>
          </form>
          <span className="absolute top-[26.7rem] right-[40px] text-blue-400 bg-blue-100 rounded-lg px-2">
            {charCount - jobData.job_details.length}
          </span>
        </section>
      </div>
    </div>
  );
};

export default EditJobMobile;
