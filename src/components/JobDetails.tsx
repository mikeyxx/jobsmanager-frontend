import { useAppSelector } from "../app/store";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

const JobDetails = () => {
  const { jobs } = useAppSelector((state) => state.jobs);

  return (
    <section>
      {jobs.map((job, index) => {
        if (index === 0) {
          return (
            <article
              className="border border-black rounded-lg p-4"
              key={job.job_uid}
            >
              <h3 className="font-bold">{job.job_title || <Skeleton />}</h3>
              <p>{job.company_name || <Skeleton />}</p>
              <p>{job.salary || <Skeleton />}</p>
              <article className="mt-4">
                <h3 className="font-bold mb-2">Job Details</h3>
                <p>{job.job_details || <Skeleton />}</p>
              </article>
              <Link to={`/apply/${job.job_uid}`}>
                <button className="bg-blue-500 text-white font-bold px-4 py-2 mt-2 rounded-lg">
                  Apply Now
                </button>
              </Link>
            </article>
          );
        }
      })}
    </section>
  );
};

export default JobDetails;
