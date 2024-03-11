import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";

import "./LoginPage.css";
import { loginUser, logoutUser } from "../../../Actions/actions";
import { Button } from 'antd';
import { Empty,notification } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

const openNotification = () => {
  notification.open({
    message: 'Notification',
    description:
      'Logged In.',
    onClick: () => {
      console.log('Successfully uploaded!');
    },
  });
};

function LoginPage(props) {
  const store = useSelector((state) => state);

  // console.log(store);

  let history = useHistory();

  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email fomat").required("*Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("*Password is required"),
  });

  const onSubmit = (values, submitProps) => {
    console.log("Form data", values);
    // submitProps.resetForm()

    dispatch(loginUser(values)).then((res) => {
      if (res.payload.data.loginSuccess === true) {
        // console.log(res);
        // console.log('LoginPage 40')
        openNotification();
        history.push("/");
      } else {
        alert("Check your email or password again");
      }
    });
  };

  return (
    <div className="bg1" style={{ width: '100%', margin: '0rem auto',marginTop:"100px"}}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className="container">
              <h2>Login</h2>
              <div className="form-control row">
                <label style={{ color: "white" }} htmlFor="email">
                  {/* email */}
                </label>
                <br />
                <Field placeholder="email" type="email" id="email" name="email"></Field>
                <ErrorMessage name="email">
                  {(error) => (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {error}
                    </div>
                  )}
                </ErrorMessage>
              </div>

              <div className="form-control row">
                <label style={{ color: "white" }} htmlFor="password">
                  {/* password */}
                </label>
                <br />
                <Field placeholder="password" type="password" id="password " name="password"></Field>
                <ErrorMessage name="password">
                  {(error) => (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {error}
                    </div>
                  )}
                </ErrorMessage>
              </div>

              <div className="form-control row">
                <button style={{width:'165px',marginTop:'20px',backgroundColor:'#FF5733',color:'white'}} type="submit" disabled={!formik.isValid} >
                  Login
                </button>
                {/* <Button type="submit" disabled={!formik.isValid}>Login</Button> */}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default LoginPage;
