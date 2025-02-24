import { Link } from "react-router";
import { formatDate } from "../lib/formatters";
import { Job } from "./JobList";

interface JobItemProps {
  job: Job;
}

function JobListItem({ job }: JobItemProps) {
  const title = job.company ? `${job.title} at ${job.company.name}` : job.title;

  return (
    <li className="media">
      <div className="media-left has-text-grey">{formatDate(job.date)}</div>
      <div className="media-content">
        <Link to={`/jobs/${job.id}`}>{title}</Link>
      </div>
    </li>
  );
}

export default JobListItem;
