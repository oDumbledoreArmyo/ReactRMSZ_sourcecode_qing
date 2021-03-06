
import logo from '../../css/mobile.css';

import React, { Component } from 'react';
import {Row, Col} from 'antd';

import {Link}from 'react-router-dom';
import {Menu,
        Icon,
        Tabs,
        message,
        Form,
        Input,
        Button,
        CheckBox,
        Modal

      } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class MobileHeader extends React.Component{
  constructor(){
    super();
    this.state={
      current:'top',
      modalVisible: false,
      action: 'login',
      haslogined: false,
      userNickName:'',
      userid:0
    };
  }

  setModalVisible(value)
  {
    this.setState({modalVisible:value});
  };

  handleClick(e){
    if(e.key="register"){
        this.setState({current:'register'});
        this.setModalVisible(true);
    }
    else{
      {
        this.setState({current:e.key});
      }
    }
  };

  handleSubmit(e){
    //页面开始向API进行提交数据
    e.preventDefault();
    var myFetchOptions = {
      method: 'GET'
    };
    var formData= this.props.form.getFieldValue();
    console.log(formData);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=register&username=userName&password=password&r_userName="+formData.r_userName+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions).
    then(response=>response.json()).then(json=>{
      this.setState({userNickName:json.NickUserName,userid:json.UserId});

    });
    message.success("请求成功！");
    this.setModalVisible(false);
  };

  login(){
    this.setModalVisible(true);
  };
  render(){
    let{getFieldDecorator} = this.props.form;
    const userShow = this.state.hasLogined?
    <Link>
      <Icon type="inbox"/>
    </Link>
    :
    <Icon type="setting" onClick={this.login.bind(this)}/>

    return(
      <div id="mobile">
        <header>
          <img src="https://cdn3.iconfinder.com/data/icons/communication-2-2/256/Newspaper-512.png" alt="logo"/>
          <span>ReactNews</span>
          {userShow}
        </header>

        <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel= {()=>this.setModalVisible(false)} cancelText = "取消" onOk={() => this.setModalVisible(false)} okText = "关闭">
          <Tabs type="card">
            <TabPane tab="注册" key="2">
            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                  <Input placeholder="请输入您的账号" {...getFieldDecorator('r_userName')}/>
                </FormItem>
                <FormItem label="密码">
                  <Input  type="password" placeholder="请输入您的密码" {...getFieldDecorator('r_password')}/>
                </FormItem>
                <FormItem label="确认密码">
                  <Input  type="password" placeholder="请再次输入您的密码" {...getFieldDecorator('r_confirmPassword')}/>
                </FormItem>
                <Button type="primary" htmlType="submit">注册</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </div>

    );
  };
}

export default MobileHeader = Form.create({})(MobileHeader);
