import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import "./index.css";

const Login: React.FC = () => {
  //登录成功后导航到首页
  const navigate = useNavigate();
  const update = () => {
    navigate(`/home`);
  };
  //用户名和密码
  const [username, setUserName] = useState<string>("");
  const [password, setPassWord] = useState<string>("");

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const errorMessage = () => {
    Modal.error({
      title: "错误",
      content: "用户名或密码出错！",
    });
  };

  const successMessage = () => {
    Modal.success({
      content: "登录成功！正在跳转...",
    });
  };
  
  //登录按钮点击的处理函数
  const onClick_btn = async () => {
    //发送登录请求
    axios
      .post("http://127.0.0.1:3001/api/login", {
        username,
        password,
      })
      .then(function (response) {
        console.log(response.data.status);
        //用户名或密码错误
        if (response.data.status === 1) {
          errorMessage();
        } else {
          successMessage();
          //将token、nickname、avatar存到本地cookie中
          cookie.save("token", response.data.token, { path: "/" });
          cookie.save("nickname", response.data.nickname, { path: "/" });
          cookie.save("avatar", response.data.avatar, { path: "/" });
          setTimeout(() => {
            update();
          }, 1000);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="wrapper">
      <div className="title">登录</div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            onChange={(e) => {
              setPassWord(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block={true}
            onClick={onClick_btn}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
