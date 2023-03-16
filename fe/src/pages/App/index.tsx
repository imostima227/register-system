import { Outlet } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { TeamOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps, Dropdown } from "antd";
import React from "react";
import "./index.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import axios from "axios";
import cookie from "react-cookies";
const { confirm } = Modal;
const { Header, Footer, Sider } = Layout;


const _page = localStorage.getItem('page')
let init_page:string
if(_page){
  init_page = _page
}
else init_page = '0'

const App = () => {
  const page = init_page
  const items = [
    {
      label: (
        <Link
          to=""
          onClick={() => {
            localStorage.setItem('page','0')
          }}
        >
          人员管理
        </Link>
      ),
      key: "item-1",
      icon: React.createElement(TeamOutlined),
    },
    {
      label: (
        <Link
          to="about"
          onClick={() => {
            localStorage.setItem('page','1')
          }}
        >
          关于
        </Link>
      ),
      key: "item-2",
      icon: React.createElement(InfoCircleOutlined),
    },
  ];
  //退出登录时导航到登录界面
  const navigate = useNavigate();
  const update = () => {
    navigate("/");
  };

  const showConfirm = () => {
    confirm({
      title: "提示",
      icon: <ExclamationCircleOutlined />,
      content: "确定要退出登录吗？",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        //发请求到服务端，删除本地cookie里的token
        axios
          .post("http://127.0.0.1:3001/api/logout")
          .then(function (response) {
            cookie.remove('token')
            update();
            console.log(response);
          })
          .catch(function (error) {
            console.log(console.error);
          });

        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const avatarItems: MenuProps["items"] = [
    {
      key: "1",
      label: "退出登录",
      onClick: () => showConfirm(),
    },
  ];

  return (
    <>
      <Layout className="main-wrapper">
        <Header className="header" style={{ padding: 0 }}>
          <div className="head-container">
            <div className="head-title">
              <span>人员管理系统</span>
            </div>
            <div className="head-userinfo">
              <span>{cookie.load("nickname")}</span>
              <Dropdown
                menu={{ items: avatarItems }}
                placement="bottom"
                arrow={{ pointAtCenter: true }}
              >
                <img alt="" src={cookie.load("avatar")} />
              </Dropdown>
            </div>
          </div>
        </Header>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={page === '0' ? ["item-1"] : ["item-2"]}
              items={items}
            />
          </Sider>
          <Layout>
            <Outlet />
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
