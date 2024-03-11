import React, { useEffect, useState } from 'react';
import { Formik , Form , Field ,ErrorMessage  } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import FileUpload from '../../utils/FileUpload';
import axios from 'axios';
import './UploadProduct.css';
import { Empty,notification } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

const openNotification = () => {
  notification.open({
    message: 'Notification',
    description:
      'Successfully Uploaded.',
    onClick: () => {
      console.log('Successfully uploaded!');
    },
  });
};

function UploadProduct(){

    const user = useSelector(state=>state.user);
    const history = useHistory();

    const [Images,setImages] = useState([]);

    const update = (data)=>{    
        setImages(data);
    }

    useEffect(()=>{

        // console.log(user.userData?.data?.email)
        if(user && user.userData && user.userData.data && user.userData.data.email != "admin@gmail.com"){
            history.push('/');
            // console.log("Upload  Product")
        }

    },[user.userData]);

    const initialValues={
        title:"",
        description:"",
        price:0,
        type:"asia"

    }

    const validationSchema=Yup.object({
        title:Yup.string().required('Required'),
        description:Yup.string().required('Required'),
        price:Yup.number().required('Required'),
        type:Yup.string().required('Required')

    })

    const onSubmit = (value)=>{
        const variables={
            writer:user.userData.data._id,
            title:value.title,
            description:value.description,
            price:value.price,
            images:Images,
            types:value.type,
        }

        axios.post('/api/product/uploadProduct',variables).then(res=>{
            if(res.data.success){
                // alert('Product successfully uploaded');
                openNotification();
                history.push('/products');

            }
            else{
                alert('Failed to upload product');
            }
        })
    }

    return(
        <div className="bg2" style={{marginTop:110}}>
            <h3>Upload Travel Product</h3>

        <Formik
             initialValues={initialValues}
             validationSchema={validationSchema}
             onSubmit={onSubmit}
        
        >{    

    (formik)=>{

        return(

            <Form>

                <FileUpload update={update}></FileUpload>

            <div className='form-control row'>
                <label htmlFor='title'></label><br/>
                <Field placeholder ='title' type='text' id='title' name='title' >

                </Field>
                <ErrorMessage name='title'>
                    {error => <div style={{color:"red",fontSize:"12px"}}>{error}</div>}
                </ErrorMessage>

            </div>

            <div className='form-control row'>
                <label  htmlFor='description'></label><br/>
                <Field cols='22' placeholder ='description' as="textarea" id='description' name='description' >

                </Field>
                <ErrorMessage name='description'>
                    {error => <div style={{color:"red",fontSize:"12px"}}>{error}</div>}
                </ErrorMessage>

            </div>

            <div className='form-control row'>
                <label style={{color:'white'}} htmlFor='description'>Price</label><br/>
                <Field type="Number" id='price' name='price' >

                </Field>
                <ErrorMessage name='price'>
                    {error => <div style={{color:"red",fontSize:"12px"}}>{error}</div>}
                </ErrorMessage>

            </div>
            <div style={{marginTop:'10px', marginBottom: '5px'}}>
                <Field name="type" as="select" htmlFor='type' placeholder="Type">
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="america">America</option>
                    <option value="australia">Australia</option>

                </Field>
            </div>
            <div>
                <button type="submit" style={{backgroundColor:'#FF5733',color:'white',borderRadius:'5px'}} disabled={!formik.isValid}>Submit</button>
            </div>
            </Form>
        )
    }
}
        </Formik>
        </div>
    )

}

export default UploadProduct;