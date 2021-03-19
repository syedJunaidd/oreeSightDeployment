import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Signin from '../src/signin/signin';
import Register from '../src/register/register';
import ForgetPass from '../src/forgetpass/ForgetPass';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import ProtectedRoute from "./protectedroute";
import ChangePass from './changepass/ChangePass';
import Dashboard from './dashboard';
import UsersList from './dashboard/list';
import AddUser from './dashboard/addUser';
import UpdateUser from './dashboard/updateForm';
import UserProfile from './dashboard/profile';
import PricingPlans from './dashboard/pricing';
import Billing from './dashboard/billing';
import ProjectsList from './dashboard/projects';
import AddProject from './dashboard/AddProject';
import ProjectDetails from './dashboard/projectDetails';

ReactDOM.render(
    <Router>
        <React.StrictMode>
            <Switch>
                <Route path="/" exact={true} component={Signin}/>
                <Route path="/forgetpass" exact={true} component={ForgetPass}/>
                <Route path="/register" exact={true} component={Register}/>
                <Route path="/dashboard" exact={true} component={Dashboard}/>
                <ProtectedRoute path="/list" exact={true} component={UsersList}/>
                <ProtectedRoute path="/addUser" exact={true} component={AddUser}/>
                <ProtectedRoute path="/updateform" exact={true} component={UpdateUser}/>
                <ProtectedRoute path="/profile" exact={true} component={UserProfile}/>
                <ProtectedRoute path="/pricing" exact={true} component={PricingPlans}/>
                <ProtectedRoute path="/billing" exact={true} component={Billing}/>
                <ProtectedRoute path="/projects" exact={true} component={ProjectsList}/>
                <ProtectedRoute path="/projectDetails" exact={true} component={ProjectDetails}/>
                <ProtectedRoute path="/addProject" exact={true} component={AddProject}/>
                <ProtectedRoute path="/projectDetails/:id" exact={true} component={ProjectDetails} />
                <Route path="/changePassword" exact={true} component={ChangePass}/>
                <Route exact path="/">
                    <Redirect exact from="/" to="dashboard"/>
                </Route>
                <Route path="*">
                    <Redirect from="/" to="dashboard"/>
                </Route>

            </Switch>
        </React.StrictMode>

    </Router>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
