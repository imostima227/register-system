import { SettingOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Form, Input,Button,Select,message } from "antd";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import "./index.css";
import { edititem,delitem, selectUserData } from "../../features/userdata/userdataSlice";
import DataType from "../../app/type";
import axios from "axios";
import cookie from 'react-cookies'

const { confirm } = Modal;
const { Option } = Select;

type Props = {
  id: string;
};

const Operation = (props: Props) => {
  //导航到查看详情页面
  const navigate = useNavigate();
  const update = () => {
    navigate(`/home/detail/${props.id}`);
  };
  //调用store中的数据
  const data: DataType[] = useSelector(selectUserData);
  const [info,setInfo] =useState(data.find(item =>{
    return item.id === props.id
}))
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
  //输入的内容
  const [input_name, setInput_name] = useState(info?.name);
  const [input_major, setInput_major] = useState(info?.major);
  const [input_grade, setInput_grade] = useState(info?.grade);
  const [input_sex, setInput_sex] = useState(info?.sex);
  const [input_phone, setInput_phone] = useState(info?.phone);
  const [input_email, setInput_email] = useState(info?.email);
  const [input_avatar, setInput_avatar] = useState(info?.avatar);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const showModalEdit = () => {
    setOpenEdit(true);
  };

  //编辑用户信息的方法
  const handleOk = () => {
    let newId = props.id
    let newItem:DataType = {
        id: newId,
        avatar:input_avatar,
        name:input_name,
        major:input_major,
        grade:input_grade,
        sex:input_sex,
        phone:input_phone,
        email:input_email,
        operation:<Operation id={newId}/>
    }
    axios({
      method: 'post',
      url: 'http://127.0.0.1:3001/list/updateUser',
      'headers': {Authorization: cookie.load('token') },
      data: newItem
    }).then(function (response) {
      console.log(response)
      if(response.data.status === 1){
        errorInput()
        return
      }
      dispatch(
        edititem(newItem)
      )
    })
    .catch(function (error) {
      console.log(error);
    });

    

    setInfo(newItem)
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

  const showPromiseConfirm = () => {
    confirm({
      title: "提示",
      icon: <ExclamationCircleOutlined />,
      content: "确定要删除用户吗？",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          axios({
            method: 'post',
            url: 'http://127.0.0.1:3001/list/delUser',
            'headers': {Authorization: cookie.load("token")},
            data: info
          }).then(function (response) {
            console.log(response)
            dispatch(delitem(props.id));
          })
          .catch(function (error) {
            console.log(error);
          });
          
          
          
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
    });
  };
  
  const errorInput = () =>{
    message.info('输入的格式不正确！');
  }

  

  const items: MenuProps["items"] = [
    {
      label: "查看",
      key: "0",
      onClick: update,
    },
    {
      label: "编辑",
      key: "1",
      onClick: showModalEdit,
    },
    {
      label: "删除",
      key: "2",
      onClick: showPromiseConfirm,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button size="small">
          <SettingOutlined/>
        </Button>
      </Dropdown>
      <Modal
        title="编辑用户"
        open={openEdit}
        onOk={handleOk}
        confirmLoading={confirmLoadingEdit}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form
          name="basic"
          initialValues={{name:input_name,
                          major:input_major,
                          grade:input_grade,
                          sex:input_sex,
                          phone:input_phone,
                          email:input_email,
                          avatar:input_avatar}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: "请输入姓名！" }]}
          >
            <Input
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
              onSelect = {(e: SetStateAction<string | undefined>)=>{
                setInput_grade(e)
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
            name="sex"
            rules={[{ required: true, message: "请输入性别！" }]}
          >
            <Select
              onSelect = {(e: SetStateAction<string | undefined>) =>{
                setInput_sex(e)
              }}>
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
            name="email"
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

export default Operation;
