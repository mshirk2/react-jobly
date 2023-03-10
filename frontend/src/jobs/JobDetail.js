import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import JoblyApi from '../api';
import UserContext from "../auth/UserContext";
import { Spinner } from "reactstrap";
import formatSalary from "../hooks/useFormatSalary";
import placeholderLogo from "../images/placeholderLogo.png"
import './JobDetail.css'

function JobDetail(){
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const { hasApplied, applyToJob } = useContext(UserContext);
    const [applied, setApplied] = useState();

    useEffect(function getJobAndAppliedStatusOnMount(){
        async function getJob(){
            let job = await JoblyApi.getJob(id);
            setJob(job);
        }
        getJob();
    }, [id]);

    useEffect(function updateAppliedStatus(){
        setApplied(hasApplied(id));
    }, [id, hasApplied]);

    async function handleApply(){
        if (hasApplied(id)) return;
        applyToJob(id);
        setApplied(true);
    }

    if (!job) return <Spinner />
    if(!job.company.logoUrl) job.company.logoUrl = placeholderLogo;

    return (
        <div className="JobDetail">
            {applied}
            <div> 
                <Link to={`/companies/${job.company.handle}`} className="link">
                    {job.company.logoUrl && <img src={job.company.logoUrl} alt={job.company.name}/>}
                    <p className="lead mt-2">{job.company.name}</p>
                </Link>
                <h4 className="display-4">{job.title}</h4>
                <p>{job.company.description}</p>
                {job.salary && <div>Salary: {formatSalary(job.salary)}</div>}
                {job.equity > 0 && <div>Equity: {job.equity}</div>}
                <button 
                    className="btn btn-dark mt-3" 
                    onClick={handleApply}
                    disabled={applied}
                >
                    {applied ? "Applied" : "Apply"}
                </button>
            </div>
        </div>
    );
}

export default JobDetail;