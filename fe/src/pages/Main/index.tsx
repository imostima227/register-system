import { Button, Layout, Modal, Form, Input, Select,message } from "antd";
import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import "./index.css";
import cookie from "react-cookies";
import DataType from "../../app/type";
import { ColumnsType } from "antd/lib/table";
import { Table, Tag } from "antd";
import Operation from "../../components/Operation";
import { selectUserData } from "../../features/userdata/userdataSlice";
import {
  additem,
  inititem,
  clearitem,
} from "../../features/userdata/userdataSlice";
import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
const { Content } = Layout;
const { Option } = Select;

//每行的数据类型
const columns: ColumnsType<DataType> = [
  {
    title: "头像",
    dataIndex: "avatar",
    key: "avatar",
    render: (src) => {
      return <img src={src} alt="" width="50rem" height="50rem" />;
    },
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "专业",
    dataIndex: "major",
    key: "major",
  },
  {
    title: "年级",
    dataIndex: "grade",
    key: "grade",
  },
  {
    title: "性别",
    dataIndex: "sex",
    key: "sex",
    render: (sex) => {
      let color = sex === "男" ? "blue" : "red";
      return (
        <Tag color={color} key={sex}>
          {sex}
        </Tag>
      );
    },
  },
  {
    title: "电话",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
  },
];
//该变量用来保存页面初次渲染时的表单数据，方便点击重置按钮时reset
let save_data: DataType[];

const Main: React.FC = () => {
  //调用store里面保存的表格数据，页面刚加载时为空
  const data: DataType[] = useSelector(selectUserData);
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
  //添加用户时输入的内容
  const [input_search, setInput_search] = useState("");
  const [input_name, setInput_name] = useState("");
  const [input_major, setInput_major] = useState("");
  const [input_grade, setInput_grade] = useState("");
  const [input_sex, setInput_sex] = useState("");
  const [input_phone, setInput_phone] = useState("");
  const [input_email, setInput_email] = useState("");
  const [input_avatar, setInput_avatar] = useState("");

  function setVisibleData() {
    return data;
  }
  //visibleData为渲染到页面上的数据
  let visibleData = useMemo(
    () => setVisibleData(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );
  //初始化函数
  const init = () => {
    //从cookie中取得token，作为报文头
    const token = cookie.load("token");
    axios
      .get("http://127.0.0.1:3001/list/getList", {
        headers: { Authorization: token },
      })
      .then(function (response) {
        let info = response.data.info;
        let list: DataType[] = [];
        for (let i = 0; i < info.length; i++) {
          let newItem = {
            id: info[i].id,
            avatar: info[i].avatar,
            name: info[i].name,
            major: info[i].major,
            grade: info[i].grade,
            sex: info[i].sex,
            phone: info[i].phone,
            email: info[i].email,
            operation: <Operation id={info[i].id} key={info[i].id} />,
          };
          list.push(newItem);
        }
        //调用userData绑定的action，将get的数据初始化给store
        dispatch(inititem(list));
        //备份
        save_data = [...list];
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const showModalEdit = () => {
    setOpenEdit(true);
  };
  //添加用户的处理方法
  const handleOk = () => {
    let newId = nanoid();
    let newItem: DataType = {
      id: newId,
      avatar: input_avatar,
      name: input_name,
      major: input_major,
      grade: input_grade,
      sex: input_sex,
      phone: input_phone,
      email: input_email,
      operation: <Operation id={newId} key={newId} />,
    };

    const token = cookie.load("token");
    console.log(token);
    //发送post请求修改服务端数据
    axios({
      method: "post",
      url: "http://127.0.0.1:3001/list/addUser",
      headers: { Authorization: token },
      data: newItem,
    })
      .then(function (response) {
        console.log(response);
        if(response.data.status === 1){
          errorInput()
          return
        }
        //更新资源池
        dispatch(additem(newItem));
      })
      .catch(function (error) {
        console.log(error);
      });
    setConfirmLoadingEdit(true);
    setTimeout(() => {
      setOpenEdit(false);
      setConfirmLoadingEdit(false);
    }, 500);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenEdit(false);
  };

  const errorMessage = () => {
    Modal.error({
      title: "错误",
      content: "没有搜索到该用户",
    });
  };

  const errorInput = () =>{
    message.info('输入的格式不正确！');
  }

  //处理搜索框的press enter的方法
  const handleSearch = () => {
    let flag = false;
    //在save_data中去搜索对应的数据
    dispatch(clearitem());
    save_data.forEach((element) => {
      if (element.name === input_search) {
        dispatch(additem(element));
        flag = true;
      }
    });
    save_data.forEach((element) => {
      if (element.major === input_search) {
        dispatch(additem(element));
        flag = true;
      }
    });
    save_data.forEach((element) => {
      if (element.grade === input_search) {
        dispatch(additem(element));
        flag = true;
      }
    });
    save_data.forEach((element) => {
      if (element.sex === input_search) {
        dispatch(additem(element));
        flag = true;
      }
    });
    if (!flag) {
      errorMessage();
    }
  };

  //重置主页的方法
  const reset = () => {
    dispatch(inititem(save_data));
  };

  return (
    <>
      <Content>
        <div className="table" style={{ padding: 24, minHeight: 360 }}>
          <div className="head-funclist">
            <div className="head-funclist-item">
              <Button type="primary" onClick={showModalEdit}>
                + 添加用户
              </Button>
            </div>
            <div className="head-funclist-item">
              <Input
                placeholder="姓名"
                onChange={(e) => {
                  setInput_search(e.target.value);
                }}
                onPressEnter={handleSearch}
              />
            </div>
            <div className="head-funclist-item">
              <Button type="primary" onClick={handleSearch}>
                搜索
              </Button>
            </div>
            <div className="head-funclist-item">
              <Button onClick={reset}>重置</Button>
            </div>
          </div>
          <Table
            rowKey="id"
            key="table"
            columns={columns}
            dataSource={visibleData}
            pagination={{ defaultPageSize: 5 }}
          />
        </div>
      </Content>
      <Modal
        title="新增用户"
        open={openEdit}
        onOk={handleOk}
        confirmLoading={confirmLoadingEdit}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          preserve={false}
        >
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: "请输入姓名！" }]}
          >
            <Input
              value=""
              onChange={(e) => {
                setInput_name(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="专业"
            name="major"
            rules={[{ required: true, message: "请输入专业！" }]}
          >
            <Input
              value=""
              onChange={(e) => {
                setInput_major(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="年级"
            name="grade"
            rules={[{ required: true, message: "请输入年级！" }]}
          >
            <Select
              value=""
              onSelect={(e: React.SetStateAction<string>) => {
                setInput_grade(e);
              }}
            >
              <Option value="2019级">2019级</Option>
              <Option value="2020级">2020级</Option>
              <Option value="2021级">2021级</Option>
              <Option value="2022级">2022级</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="性别"
            name="sexs"
            rules={[{ required: true, message: "请输入性别！" }]}
          >
            <Select
              onSelect={(e: React.SetStateAction<string>) => {
                setInput_sex(e);
              }}
            >
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="电话"
            name="phone"
            rules={[{ required: true, message: "请输入电话！" }]}
          >
            <Input
              onChange={(e) => {
                setInput_phone(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="mail"
            rules={[{ required: true, message: "请输入邮箱！" }]}
          >
            <Input
              onChange={(e) => {
                setInput_email(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="头像"
            name="avatar"
            rules={[{ required: true, message: "请输入头像地址！" }]}
          >
            <Input
              onChange={(e) => {
                setInput_avatar(e.target.value);
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Main;
