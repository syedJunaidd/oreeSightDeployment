import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import "./style.scss";
import { Layout, Menu ,Breadcrumb } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import {useHistory} from 'react-router';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import SideNav from "./SideNav";
import Dash from "./dash1";


const { Header, Sider, Content } = Layout;

const Dashboard = () => {
    const [collapse, setCollapse] = useState(false);
    const [contest, setContest]=useState(true);
    const handleUserClick = () => {
        history.push('/lists');
    }
    const history = useHistory();
  const handleToggle = (event) => {
    event.preventDefault();
    collapse ? setCollapse(false) : setCollapse(true);
}

    return (
        <Router>
      <Layout style={{minHeight:"100vh"}}>
        <Sider theme="light" trigger={null} collapsible collapsed={collapse} >
      <SideNav />
        </Sider>
        <Layout className="site-layout" theme="light" >
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: handleToggle,
            })}
            
         <form class="form-inline">
            <div class="input-group input-group-sm">
                <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" style={{backgroundColor:"#F2F4F6"}}/>
                <div class="input-group-append">
                    <button class="btn btn-navbar" type="submit">
                   
                    </button>
                </div>
            </div>
        </form>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '1px -11px',
              padding: 0,
              minHeight: 280,
              backgroundColor:"#F4F6F9",
            
            }}
          >
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
 
               <Switch>
                    {/*<Route path="/list" component={Lists} />*/}
                    <Route path="/dashboard" component={Dash} />
                    {/*<Route path="/updateform" component={UpdateForm} />*/}
                    {/*<Route path="/adduser" component={AddUser} />*/}
                    {/*<Route path="/profile" component={Profile} />*/}
                    {/*<Route path="/pricing" component={PricingPlan} />*/}
                    {/*<Route path="/billing" component={Billing} />*/}
                    {/*<Route path="/projects" component={Projects} />*/}
               
                </Switch>
      
          </Content>
        </Layout>
      </Layout>
      </Router>
    );
  }
export default Dashboard;
