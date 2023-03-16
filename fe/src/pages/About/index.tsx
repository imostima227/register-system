import { Typography, PageHeader } from "antd";
import React from "react";
import './index.css'

const { Title, Paragraph, Text } = Typography;
const About: React.FC = () => {

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="亮点介绍"
        subTitle="项目中的部分闪光点"
      />
      <div className="about-wrapper">
      <Typography>
        <Title level={4}>数据管理</Title>
        <Title level={5} >redux框架</Title>
        <Paragraph>
        这个项目中我的数据主要采用了redux框架，其中存储的数据只有<Text strong={true}>人员管理界面的表格信息</Text>即userdata。在userdataSlicer中，我为userdata设定了5个action，分别是additem添加条目,delitem删除条目,edititem编辑条目，inititem初始化条目以及clearitem清空条目。在人员管理页面、查看详情页面以及Operation组件里均使用了userdata的数据
        </Paragraph>
        <Title level={5} >验证功能</Title>
        <Paragraph>
        在服务端，我使用了joi包并设计了schema以及中间件validateSchemaJoi，为用户登录、修改列表等接口设置格式验证，以校验输入的请求并返回错误信息。在用户登录时，使用jsonwebtoken包为登录的接口设置<Text strong={true}>token验证</Text>，并使用ctx.cookies.set方法将token传给客户端。并在app.js中使用jwt包来<Text strong={true}>拦截非法请求</Text>，只有当用户的请求的header中包含了<Text code={true}>Bearer token</Text>才能正确访问。以<Text code={true}>/api</Text>开头的接口（即登录登出接口）不受保护。
        </Paragraph>
        <Title level={4}>功能特点</Title>
        <Title level={5}>搜索功能</Title>
        <Paragraph>
        点击搜索之后，会根据搜索框的内容去匹配，按照用户<Text strong={true}>姓名、专业、年级、性别</Text>的顺序搜索，并将符合的结果渲染到界面上。如果没有搜索到任何相关的内容，则会<Text strong={true}>弹出提示消息</Text>的Model告知用户没有搜索到相关内容.
        </Paragraph>
        <Title level={5}>信息保留</Title>
        <Paragraph>
        点击操作中的编辑时，弹出的表单会保留用户之前的信息。而点击添加用户时，表单则为空白。进入任务详情页面后，数据也不会因为redux框架的原因随着刷新页面而丢失。
        </Paragraph>
      </Typography>
      </div>
    </>
  );
};

export default About;
