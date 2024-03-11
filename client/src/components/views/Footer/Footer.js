import React from 'react';
import { Row, Col } from 'antd';
import './Footer.css';

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-wrap">
        <Row>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2 style={{color:'white'}}>Instagram</h2>
              <div>
                <a target="_blank " href="https://www.instagram.com/">
                  TourVibes
                </a>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2 style={{color:'white'}}>Facebook</h2>
              <div>
                <a target="_blank" href="https://www.facebook.com/">TourVibes</a>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2 style={{color:'white'}}>Get to know Us</h2>
              <div>
                <a href="/changelog">
                  About Us
                </a>
              </div>
              <div>
                <a rel="noopener noreferrer" href="/changelog">
                  Careers
                </a>
              </div>
              <div>
                <a rel="noopener noreferrer" href="/changelog">
                  Releases
                </a>
              </div>
              <div>
                <a rel="noopener noreferrer" href="/changelog">
                  Gifts
                </a>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2 style={{color:'white'}}>
                <img className="title-icon" src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg" alt="" />
                Help
              </h2>
              <div>
                <a rel="noopener noreferrer"href="/changelog">Help</a>

              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Row className="bottom-bar" style={{marginTop:30}}>
        <Col lg={4} sm={24} />
        <Col lg={20} sm={24}>          
          <span style={{ marginRight: 270 }}>Copyright © TourVibes</span>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;