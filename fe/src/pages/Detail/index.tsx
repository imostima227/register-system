import { Layout } from "antd";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import "./index.css";
import DataType from "../../app/type";
import { useSelector } from "react-redux";
import { selectUserData } from "../../features/userdata/userdataSlice";

//传入的参数
type Params = {
  id: string;
};

const { Content } = Layout;

let init_item: DataType;
let _init_item = localStorage.getItem("item");
if (_init_item) {
  try {
    init_item = JSON.parse(_init_item);
  } catch (error) {
    console.error("invalid cache");
  }
}

const Detail: React.FC = () => {
  const data: DataType[] = useSelector(selectUserData);
  const params = useParams<Params>();
  const [info, setInfo] = useState<DataType>();

  const init = () => {
    if (data.length === 0) {
      setInfo(init_item);
    } else {
      data.forEach((element) => {
        if (element.id === params.id) {
          setInfo(element);
          localStorage.setItem("item", JSON.stringify(element));
        }
      });
    }
  };

  useEffect(
    () => {
      init();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <Content>
        <div className="content-wrapper">
          <div className="content-header">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">人员管理</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>查看详情</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="description-container-wrapper">
            <div
              className="description-container"
              style={{ padding: 24, minHeight: 360 }}
            >
              <section className="des-section">
                <div className="des-user-info">用户信息</div>
                <div className="des-item-container">
                  <div className="des-item">头像</div>
                  <img
                    src={info?.avatar}
                    alt=""
                    width="100rem"
                    height="100rem"
                  />
                </div>
                <div className="des-item-container">
                  <div className="des-item">姓名</div>
                  <div className="des-item"> {info?.name}</div>
                </div>
                <div className="des-item-container">
                  <div className="des-item">专业</div>
                  <div className="des-item">{info?.major}</div>
                </div>
                <div className="des-item-container">
                  <div className="des-item">年级</div>
                  <div className="des-item"> {info?.grade}</div>
                </div>
                <div className="des-item-container">
                  <div className="des-item">性别</div>
                  <div className="des-item">{info?.sex}</div>
                </div>
                <div className="des-item-container">
                  <div className="des-item">电话</div>
                  <div className="des-item">{info?.phone}</div>
                </div>
                <div className="des-item-container">
                  <div className="des-item">邮箱</div>
                  <div className="des-item">{info?.email}</div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export default Detail;
