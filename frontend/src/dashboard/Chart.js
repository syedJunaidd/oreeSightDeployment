import react from 'react'
import {Bar, Doughnut, Line, } from 'react-chartjs-2'


function Chart(props){
const { doughnutValues,startDates,actualCosts} = props;
console.log(props)
    const bar ={
        labels:['Total Cost for Remainder', 'Total Amount','Total Actual Cost', '',''],
        datasets :[
          {
            label: 'Project Cost Analysis',
            data :[doughnutValues.totalCostForRemainder, doughnutValues.totalAmount, doughnutValues.totalActualcost],
            backgroundColor: ['#b7b7b7', '#3490dc','#53c3b8'  ],
          },
          
        ]
      }
      const options = {
          title:{
              display:true,
              text:'bar chart',
              gridlines:'none',
              
          },
          scales :{
            gridlines:{
                display:false
            }
          },
      }
      
      
      const doughnut ={
        labels:['Total Cost for Remainder', 'Total Amount','Total Actual Cost',],
        datasets :[
          {
            label: 'sales',
            data :[doughnutValues.totalCostForRemainder, doughnutValues.totalAmount, doughnutValues.totalActualcost],
            backgroundColor: ['#b7b7b7', '#3490dc','#53c3b8' ],
          },
          
        ]
      }
      

      const line ={
        labels:startDates,
        datasets :[
          {
            label: 'sales',
            data :actualCosts,
            backgroundColor: [ ],
            gridlines:{
                display:false,
            },
          },
          
        ]
      }
      

      

     return(

        <div className="chart row mt-2 fullchart">

            <div className="col-md-12 firstchart">
                <div className="row">
                    <div class="col-6">
                <Doughnut data = {doughnut} options/></div>
                <div className="col-6">
                  <Bar data = {bar} options/></div>
                  </div>
                  </div>
             {/* <div className='col-md-6 saas'>
                <Line data = {line} options/></div>     */}
            </div>
     )



}
export default Chart