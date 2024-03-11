import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { PlusOutlined, FileExcelFilled  } from  '@ant-design/icons';
import axios from 'axios';

function FileUpload(props){

    const [Images,setImages] = useState([]);

    const onDrop = (files) =>{

        const formData = new FormData();
        
        // console.log(files[0]);


        const config = {
            header:{'content-type':'multipart/form-data'}
        }
        formData.append("file",files[0]);

        var fileExt = files[0].name.split('.').pop();
        // console.log(fileExt);

        if(fileExt!='jpg' && fileExt!='png' && fileExt!='jpeg'){
            return (alert('Only jpg and png files are allowed'));
        }

        // console.log(formData.file);

        axios.post('/api/product/uploadImage',formData,config).then(res=>{
            if(res.data.success){
                setImages([...Images, res.data.image]);
                props.update([[...Images, res.data.image]]);
            }
            else{
                    alert('Failed to save the Image in Server')
            }
        })
    }

    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.update(newImages)
    }


    return(

        <div style={{display:'flex',justifyContent:'space-between'}}>
                <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',margin:"auto"
                    }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <PlusOutlined style={{color:'white'}}></PlusOutlined>

                    </div>
                )}
            </Dropzone>


            <div style={{ display: 'flex', width: '350px',border:'1px solid white', height: '240px', overflowX: 'scroll',margin:"auto"}}>

                {Images.map((image, index) => (
                    <div onClick={()=>onDelete(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`http://localhost:6200/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}

        </div>


            </div>

    )

}

export default FileUpload