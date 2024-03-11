import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { Empty,notification } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

const openNotification = () => {
  notification.open({
    message: 'Notification',
    description:
      'Logged Out.',
    onClick: () => {
      console.log('Successfully uploaded!');
    },
  });
};


function RightMenu(props) {
  const user = useSelector(state => state.user)

  const history=useHistory();
  console.log(user);

  const logoutHandler = () => {
    axios.get(`http://localhost:3000/api/users/logout`).then(response => {
      if (response.status === 200) {
        openNotification();
        history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.data.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="products">
          <a href="/products">Products</a>
        </Menu.Item>
        <Menu.Item key="history">
          <a href="/history">History</a>
        </Menu.Item>
        {
          user && user.userData && user.userData.data && user.userData.data.email == "admin@gmail.com" && 
          <Menu.Item key="orders">
            <a href="/orders">Orders</a>
          </Menu.Item>
        }
        {
          user && user.userData && user.userData.data && user.userData.data.email == "admin@gmail.com" && 
          <Menu.Item key="upload">
            <a href="/upload/product">Upload</a>
          </Menu.Item>
        }
        <Badge count={user.userData?.data?.cart.length}>
        <Menu.Item key="cart">
          <a href="/cart"><ShoppingCartOutlined style={{fontSize:"20px"}}/></a>
        </Menu.Item>
        </Badge>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
        
      </Menu>
    )
  }
}

export default withRouter(RightMenu);