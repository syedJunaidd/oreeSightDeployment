import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import DashboardLayout from '../shared/layout/DashaboardLayout';
import Chart from './Chart';
import axios from "axios";
import { date } from 'yup';
import moment from 'moment';
const Dashboard = () => {
    const [allData, setAllData] = useState({});
    const [dates, setAllDates] = useState([]);
    const [actualCosts, setActualCost] = useState([]);
    const [mapsVisibility, setMapsVisibility] = useState(false);
    useEffect(() => {
        (async () => {
          const res = await axios.get(`${process.env["REACT_APP_API_URL"]}api/v1/projects/dashboard`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
          if(res.data.data.totalCostForRemainder > 0 || res.data.data.totalActualcost > 0 || res.data.data.totalAmount > 0){
            setAllData(res.data.data);
            setMapsVisibility(true);
          }else{
            setAllData(res.data.data);
          }
          let tempdates = [];
          let tempactualCost = [];
          res.data.data.dates.map((data)=>{
            tempdates.push(data.startDate);
            tempactualCost.push(data.actualCost);
          })
          var filteredDates = tempdates.filter(function(x) {
            return x !== undefined;
         });
         var filteredActualCost = tempactualCost.filter(function(x) {
            return x !== undefined;
         });
          let formatedDates = [];
          filteredDates.map((data)=>{
           formatedDates.push(moment(data).format('YYYY-MM-DD'))
          })
          setAllDates(formatedDates);
          setActualCost(filteredActualCost);
        })();
      }, []);
     
    return (
        
        <DashboardLayout activeKey={1}>
            <section class="content-header mt-3 px-5">
                <div class="container">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0 text-dark">Dashboard</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item active">Dashboard</li>
                            </ol>
                        </div>
                    </div>
                </div>
                </section>
                <section>
                    <div className="container">
                        <div className="row  ">
                            <div className="col-sm block-info mr-1">
                            <div className="row">
                                <div className="col-sm-2 graph-icon"><i class="fa fa-chart-bar"></i></div>
                              <div className="values col-sm"> <span class="font900 mb-0"><div className="color">${allData.totalActualcost?allData.totalActualcost.toFixed(0):'0'}</div></span>
                                <p className="explain-1">Total Cost For Remainder</p></div>
                            </div>
                                </div>
                                <div className="col-sm block-info mr-1">
                                <div className="row">
                                <div className="col-sm-2 graph-icon"><i class="fa fa-chart-bar"></i></div>
                              <div className="values col-sm"><div className="color">${allData.totalAmount? allData.totalAmount.toFixed(0): '0'}</div>
                                <p className="explain">Total Amount</p></div>
                            </div>
                                </div>
                                <div className="col-sm block-info mr-1">
                                <div className="row">
                                <div className="col-sm-2 graph-icon"><i class="fa fa-chart-bar"></i></div>
                              <div className="values col-sm"><div className="color">${allData.totalCostForRemainder?allData.totalCostForRemainder.toFixed(0): '0'}</div>
                                <p className="explain">Total Actual Cost </p></div>
                            </div>                               
                                </div>
                                
                        </div>
                    </div>
                </section>
            {mapsVisibility ? 
              <Chart doughnutValues ={allData} startDates={dates} actualCosts={actualCosts}/> :
              <span className="chartsMsg">Sorry No Data Available</span>
            }
            
            </DashboardLayout>
    );
}

export default Dashboard;
