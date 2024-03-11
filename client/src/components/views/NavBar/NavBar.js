import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button ,Icon} from 'antd';
import './Sections/Navbar.css';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { DropboxOutlined ,FireTwoTone} from '@ant-design/icons';
import { getTwoToneColor, setTwoToneColor } from '@ant-design/icons';

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  setTwoToneColor('#00bfff');  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <a href="/"> <FireTwoTone style={{fontSize:'40px'}}></FireTwoTone><span style={{color:'#00bfff'}}>TourVibes</span></a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
        {/* <i class="angle double left icon"></i> */}
        <DoubleLeftOutlined />
          {/* <Icon type="align-right" /> */}
        </Button>
        <Drawer
          title="Content Items"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar