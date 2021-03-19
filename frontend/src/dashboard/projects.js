import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Table, Tag, Space } from "antd";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DashboardLayout from "../shared/layout/DashaboardLayout";
import { parse, end, toSeconds, pattern } from "iso8601-duration";
import moment from 'moment';
import { useHistory } from "react-router-dom";
import {faTrash} from '@fortawesome/free-solid-svg-icons'

const Projects = () => {
  let data1 = localStorage.getItem("user");
  const [allData, setAllData] = useState([]);
  const [deleted, setDeleted] = useState(0);
  console.log(toSeconds(parse("PT4128H0M0S")));
  const history = useHistory();
  useEffect(() => {
    (async () => {
      const res = await axios.get(`${process.env["REACT_APP_API_URL"]}api/v1/projects`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log("Sample data set", res.data.data);
      res.data.data.map((element) => {
        if (element.actualWork && element.actualWork != null && element.actualWork != 'NaN') {
          element.actualWork = toSeconds(parse(element.actualWork))/3600/24;
        }
        if (element.remainingWork && element.remainingWork != null && element.remainingWork != 'NaN') {
          element.remainingWork = toSeconds(parse(element.remainingWork))/3600/24;
        }
      });
      setAllData(res.data.data);
    })();
  }, [deleted]);

  async function deleteFunction({ key }) {
    let _id = key;
    console.log(_id)
    const res = await axios.delete(
      `${process.env["REACT_APP_API_URL"]}api/v1/projects/${_id} `,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    setDeleted(deleted + 1);
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render:proj=><Link to={{
        pathname: '/projectDetails',
        state: proj
      }}> {proj.name} </Link>
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "Finish Date",
      dataIndex: "finishDate",
    },
    {
      title: "Remaining Work",
      dataIndex: "remainingWork",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Work Done Percentage",
      dataIndex: "workDonePercentage",
    },
    {
      title: "Actual Cost",
      dataIndex: "actualCost",
    },
    {
      title: "Budgeted Cost",
      dataIndex: "budgetedCost",
    },
    {
      title: "Actual Work",
      dataIndex: "actualWork",
    },
    {
      title: "Cost For Remainder",
      dataIndex: "costForRemainder",
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
          <Space size="middle">
              <a class="btn btn-outline-danger px-2 py-1" style={{border: "1px solid red"}}
                 onClick={() => deleteFunction(record)}> <FontAwesomeIcon icon={faTrash} className=""/></a>
          </Space>
      ),
    }
  ];

  function numberWithCommas(x) {
    if(x != null && x != undefined){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }else{
      return ''
    }   
  }

  const data = [];
  allData.map((project) => {
    data.push({
      key: project._id,
      startDate: moment.utc(project.startDate).format('MMM Do YYYY'),
      finishDate: moment.utc(project.finishDate).format('MMM Do YYYY'),
      duration: Number(project.duration).toFixed(0),
      workDonePercentage: Number(project.workDonePercentage).toFixed(2) + "%",
      actualCost: project.actualCost? numberWithCommas(project.actualCost.toFixed(0)): '',
      budgetedCost: project.budgetedCost? numberWithCommas(project.budgetedCost.toFixed(0)):'' ,
      actualWork: project.actualWork? Number(project.actualWork).toFixed(0) + " days": '',
      costForRemainder: project.costForRemainder? numberWithCommas(project.costForRemainder.toFixed(0)): '',
      remainingWork: project.remainingWork? Number(project.remainingWork).toFixed(0) + " days": '',
      name: project
    });
    return data;
  });
  console.log("my data", allData);
  return (
    <DashboardLayout activeKey={5}>
      <section class="content-header px-4 mt-3">
        <div class="container">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Projects</h1>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <a href="/dashboard">
                    Dashboard
                  </a>
                </li>
                <li class="breadcrumb-item active">Projects</li>
              </ol>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mb-4 ">
              <div className="float-right">
                <Link
                  type=""
                  class="btn btn-outline-success"
                  to={`/addProject`}
                  style={{ border: "1px solid green" }}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="" style={{ margin:20}}>
        <div className="row px-4">
          <div className="col-12">
            <Table columns={columns} dataSource={data}></Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Projects;