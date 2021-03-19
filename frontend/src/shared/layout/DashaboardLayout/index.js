import React, {useState} from 'react';
import SideNav from "../../../dashboard/SideNav";
import {Layout} from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;

const DashboardLayout = ({children, activeKey}) => {
    const [collapse, setCollapse] = useState(false);
    const handleToggle = (event) => {
        event.preventDefault();
        collapse ? setCollapse(false) : setCollapse(true);
    }
    return (
        <React.Fragment>
            <Layout style={{minHeight: "100vh"}}>
                <Sider theme="light" trigger={null} collapsible collapsed={collapse}>
                    <SideNav activeKey={activeKey}/>
                </Sider>
                <Layout className="site-layout" theme="light">
                    <Header className="site-layout-background" style={{padding: 0}}>
                        {React.createElement(collapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: handleToggle,
                        })}

                        <form class="form-inline">
                            <div class="input-group input-group-sm">
                                <input class="form-control form-control-navbar" type="search" placeholder="Search"
                                       aria-label="Search" style={{backgroundColor: "#F2F4F6"}}/>
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
                            backgroundColor: "#F4F6F9",

                        }}
                    >
                        {children}

                    </Content>
                </Layout>
            </Layout>
        </React.Fragment>
    )
}

export default DashboardLayout;
