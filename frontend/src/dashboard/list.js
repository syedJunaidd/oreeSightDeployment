import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import {Table, Tag, Space} from 'antd';
import {Link, useLocation, BrowserRouter as Router} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import DashboardLayout from '../shared/layout/DashaboardLayout';

const Lists = () => {
    let data1 = localStorage.getItem('user')
    const [allData, setAllData] = useState([]);
    const [deleted, setDeleted] = useState(0);

    console.log(data1);

    useEffect(() => {
      (async () => {
        const res = await axios.get(`${process.env["REACT_APP_API_URL"]}api/v1/users`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      console.log(res.data.data);
      setAllData(res.data.data);
      })();
    }, [deleted]);
       
    async function deleteFunction( {_id }) {
    const res = await axios.delete(`${process.env["REACT_APP_API_URL"]}api/v1/users/${_id} `,{
      headers: {
        authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    setDeleted(deleted + 1);  
  }
  

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Phone',
            dataIndex: 'phone'
        },

        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Link class="btn btn-outline-success px-2 py-1" style={{border: "1px solid green"}}
                          to={`/updateform?id=${record._id}`}> <FontAwesomeIcon icon={faEdit} className=""/></Link>
                    <a class="btn btn-outline-danger px-2 py-1" style={{border: "1px solid red"}}
                       onClick={() => deleteFunction(record)}> <FontAwesomeIcon icon={faTrash} className=""/></a>
                </Space>
            ),
        }
    ];
    const data = [{}];
    allData.map((user) => {
        data.push({
            key: user.id,
            firstname: user.firstName,
            email: user.email,
            phone: user.phone,
            action: user.review + '%',
        })
        return data;
    });
    return (
        <DashboardLayout activeKey={2}>

            <section class="content-header px-4 mt-3">
                <div class="container">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0 text-dark">Users</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><Link to={`/dashboard`}>Dashboard</Link></li>
                                <li class="breadcrumb-item active">Users.</li>
                            </ol>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-4 ">
                            <div className="float-right">
                                <Link type="" class="btn btn-outline-success" to={`/adduser`}
                                      style={{border: "1px solid green"}}><FontAwesomeIcon icon={faPlus}/> Add
                                    User</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <div className="row px-4">
                    <div className="col-12">
                        <Table columns={columns} dataSource={allData}>
                        </Table>
                    </div>
                </div>
            </div>

        </DashboardLayout>
    );
}

export default Lists;