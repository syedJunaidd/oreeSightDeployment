import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Table, Tag, Space } from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DashboardLayout from "../shared/layout/DashaboardLayout";
import { parse, end, toSeconds, pattern } from "iso8601-duration";
import moment from 'moment';
import generateCalendar from "antd/lib/calendar/generateCalendar";

const ProjectDetails = (props) => {
  let data1 = localStorage.getItem("user");
  const [allData, setAllData] = useState([]);
  const [deleted, setDeleted] = useState(0);
  const [projectData, setProjectData] = useState(null);
  const [data, setData] = useState({"BCWS" : null, "BCWP" : null, "ACWP" : null, "BAC" : null, "EAC" : null, "CV" : null, "CV%" : null, "SV" : null, "SV%" : null, "CPI" : null, "SPI" : null});

  useEffect(() => {
    console.log("Location", props.location.state);
    setProjectData(props.location.state);
  }, []);

  const updateValues = () => {

  }
  const getCVPct = () =>{
    let cv = projectData.bcwp - projectData.acwp
    if (projectData.bcwp > 0) {
      return cv / projectData.bcwp;
    } else {
      return 0;
    }
  }

  const getSVPct = () =>{
    let cv = projectData.bcwp - projectData.bcws
    if (projectData.bcwp > 0) {
      return cv / projectData.bcwp;
    } else {
      return 0;
    }
  }

  const getTCPI = () =>{
    let remWork = projectData.budgetedCost - projectData.bcwp
    let remFund = projectData.budgetedCost - projectData.acwp
    if (remFund !== 0){
      return remWork / remFund;
    } else{
      return 1;
    }
  }

  const getTSPI = () =>{
    let remWork = projectData.budgetedCost - projectData.bcwp
    let remFund = projectData.budgetedCost - projectData.bcws
    if (remFund !== 0){
      return remWork / remFund;
    } else{
      return 1;
    }
  }

  const getEAC = () => {
    let ccpi = projectData.acwp>0? projectData.bcwp / projectData.acwp : 0
    return ccpi>0? projectData.budgetedCost / ccpi: projectData.budgetedCost
  }
  function numberWithCommas(x) {
    if(x != null && x != undefined){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }else{
      return ''
    }   
  }
  
  if (projectData) {
  return (
    <DashboardLayout activeKey={5}>
      <section class="content-header px-4 mt-3">
        <div class="container">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">{projectData ? projectData.name : null} Details</h1>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <a href="/dashboard">
                    Dashboard
                  </a>
                </li>
                <li class="breadcrumb-item active">Product Details</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row px-4">
          <div className="col-12">
            <ol>
              <li>{ numberWithCommas(projectData.budgetedCost.toFixed(0)) } is the Budgeted Cost of Work Scheduled for {projectData.name}</li>
              <li>{ numberWithCommas(projectData.actualCost.toFixed(0)) } is the actual cost taken to complete the work as of {moment.utc(projectData.statusDate).format('MMMM Do YYYY')}</li>
              <li>{ projectData.acwp? numberWithCommas(projectData.acwp.toFixed(0)): '0' } is the total cost of the work performed as of {moment.utc(projectData.statusDate).format('MMMM Do YYYY')}</li>
              <li>{ (projectData.budgetedCost>0)?(100 * projectData.bcws / projectData.budgetedCost).toFixed(2): 0 } % of the work was planned to be completed by this time</li>
              <li>{ projectData.budgetedCost? (100 * projectData.bcwp / projectData.budgetedCost).toFixed(2): "" }% of the work was completed by this time</li>
              <li>{ (projectData.bcwp - projectData.acwp) == 0 ? 'You project is on budget'
              : (projectData.bcwp - projectData.acwp) > 0
              ? 'Your project is under budget by ' + numberWithCommas((projectData.bcwp - projectData.acwp).toFixed(0))
              : 'Your project is over budget by ' + numberWithCommas((projectData.bcwp - projectData.acwp).toFixed(0))  } </li>
              <li>{ getCVPct() == 0? 'Your project is on budget and the cost variance is 0 %'
              : (getCVPct > 0)  
              ? 'Your project is under budget by ' + (100* getCVPct()).toFixed(2) + '%'
              : 'Your project is under budget by '  + (100* getCVPct()).toFixed(2) + '%'}</li>
              <li>{ (projectData.bcwp - projectData.bcws) == 0? 'Your project is on schedule':
              (projectData.bcwp - projectData.bcws) > 0
              ? 'Your project is ahead of schedule ' + numberWithCommas((projectData.bcwp - projectData.bcws).toFixed(0))
              : 'Your project is behind schedule, Corrective Action is Needed!!'  } </li>
              <li>{ getSVPct() == 0 ? 'Your project schedule is on time with 0% schedule variance'
              : getSVPct() > 0
              ? 'Your project is ' + (100* getSVPct()).toFixed(2) +  '% ahead of schedule'
              : 'Your project is ' + Math.abs((100* getSVPct()).toFixed(2)) +  '% behind of schedule'}</li>
              <li>Based on the Reporting Period:
                <ul>
              <li>{(projectData.bcwp / projectData.acwp) > 1
              ? 'Your Resource Utilization is good' 
              : 'Your Resource Utilization is not good'}</li>
              <li>{getTCPI() > 1
              ? 'Utilization of the project team for the remainder of the project can be stringent'
              :'Utilization of the project team for the remainder of the project can be lenient'}</li>
              <li>{(projectData.bcwp / projectData.bcws) > 1
              ? 'Your project team is very efficient in utilizing the time allocated to the project' 
              : 'Your project team is less efficient in utilizing the time allocated to the project'}</li>
              <li>{getTSPI() > 1
              ? 'Project team can be lenient in utilizing the remaining time allocated to the project'
              :'Project team needs to work harder in utilizing the remaining time allocated to the project'}</li>
              </ul></li>
              <li>Per Current Trends:
                <ul>
                  <li>
                  Your budget at completion will be {numberWithCommas(projectData.budgetedCost.toFixed(2))}
                  </li>
                  <li>Your estimated cost required to complete the remainder of the project is { numberWithCommas((projectData.budgetedCost - projectData.bcwp).toFixed(2)) }</li>
                  <li>Your estimated cost at the end of the project is {numberWithCommas(getEAC().toFixed(0))}</li>
                  <li>Variance on the total budget at the end of the project is { numberWithCommas((projectData.budgetedCost - getEAC()).toFixed(0)) } </li>
                  <li>The estimated date your project is going to be complete is {moment.utc(projectData.finishDate).format('MMM Do YYYY')}</li>
                </ul>
              </li>
            </ol>
            
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
  }
  else {
    return(<div>Hassan</div>)
  }
};

export default ProjectDetails;