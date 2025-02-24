import { Link } from "react-router-dom";
import { formatDate } from "../lib/formatters";
import JobListItem from "./JobListItem";

export interface Job {
  id: string;
  date: string;
  title: string;
  company?: {
    name: string;
  };
}

interface JobListProps {
  jobs: Job[];
}

function JobList({ jobs }: JobListProps) {
  return (
    <ul className="box">
      {jobs.map((job) => (
        <JobListItem key={job.id} job={job} />
      ))}
    </ul>
  );
}

export default JobList;
