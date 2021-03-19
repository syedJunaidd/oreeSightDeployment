import React from "react";
import { Menu } from "antd";

import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  TeamOutlined,
  DesktopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faIdCardAlt } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faBusinessTime } from "@fortawesome/free-solid-svg-icons";
import { faRoad } from "@fortawesome/free-solid-svg-icons";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const SideNav = ({ activeKey }) => {
  const [role, setRole] = useState("");
  let user = JSON.parse(localStorage.getItem("user"));
  let userName = "";
  console.log('Active Key',activeKey);
  if (user && user.user) {
    userName = user.user.firstName + " " + user.user.lastName;
  }

  useEffect(()=>{
    setRole(user.user.role);
    console.log(role);
  },[])
  const history = useHistory();
  
  const handleUserClick = () => {
    history.push("/list");
  };
  const handleVideosClick = () => {
    history.push("/profile");
  };
  const handleFileClick = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const handlePaymentClick = () => {
    history.push("/billing");
  };
  const handleUserDashboard = () => {
    history.push("/dashboard");
  };
  const handleProjectClick = () => {
    history.push("/projects");
  };
  const handleUsersClick = () => {
    history.push("/list");
  };

  return (
    <div>
      <div className="level1">
        <img
          src="https://psschedule.interactivesolutions.tech/img/logo.jpg"
          alt="Logo"
          class="brand-image img-circle elevation-3"
          style={{ opacity: "0.8" }}
        />{" "}
        <span className="ml-2 mt-1 brand-text font-weight-light brand-link brand-text font-weight-light">
          OreeSight
        </span>
      </div>
      <div>
        <hr className="new1" />
      </div>
      <div className="level1">
        <img src="/images/ms.jpg" className="level1img" />{" "}
        <span className="ml-3 info" style={{ fontSize: "16px" }}>
          {userName}
        </span>
      </div>
      <div className="px-2">
        <hr className="new2 " />
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[activeKey.toString()]}
      >
        <Menu.Item key="1" onClick={handleUserDashboard}>
          <FontAwesomeIcon icon={faTachometerAlt} className="nav-item" />
          <span className="head1"> Dashboard</span>
        </Menu.Item>
        

        <Menu.Item key="3" onClick={handleVideosClick}>
          <FontAwesomeIcon icon={faIdCardAlt} className="nav-item3" />
          <span className="head1"> Profile</span>
        </Menu.Item>
        <Menu.Item key="4" onClick={() => handlePaymentClick()}>
          <FontAwesomeIcon icon={faShoppingCart} className="nav-item4" />
          <span className="head1"> Payment Plan</span>
        </Menu.Item>
        <Menu.Item key="5" onClick={() => handleProjectClick()}>
          <FontAwesomeIcon icon={faTasks} className="nav-item5" />

          <span className="head1"> Projects</span>
        </Menu.Item>

        {role === "admin" && (
          <Menu.Item key="2" onClick={handleUserClick}>
            <FontAwesomeIcon icon={faUsers} className="nav-item2" />
            <span className="head1"> Users</span>
          </Menu.Item>
        )}

        <Menu.Item key="6" onClick={() => handleFileClick()}>
          <FontAwesomeIcon icon={faSignOutAlt} className="nav-item6" />
          <span className="head1"> Logout</span>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideNav;
