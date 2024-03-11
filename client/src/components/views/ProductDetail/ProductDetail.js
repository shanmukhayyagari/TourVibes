import React, { useEffect, useState } from 'react';
import ImageSlider from '../../utils/ImageSlider';
import axios from 'axios';
import { addToCart } from '../../../Actions/actions';
import { Card,Descriptions,Button,Col,Row } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const { Meta } = Card;

function ProductDetail(props){

    const history = useHistory();

    const [Product,setProduct] = useState([]);
    const [Products,setProducts] = useState([]);

    const dispatch = useDispatch();

    const addToCartHandler = ()=>{
        console.log('Cart');

        dispatch(addToCart(Product[0]._id)).then(res=>{
            console.log(res.payload.data.success);
            history.push('/cart');
        }
        );

    }

    useEffect(()=>{

        const Id = props.location.pathname;

        const array = Id.split('/');

        axios.post('/api/product/getDetail',{id:array[2]}).then(res=>{
            if(res.data.success){
                console.log(res.data.product[0],'hi');
                 setProduct([res.data.product[0]]);
            }
            else{
                console.log('Error ');
            }
        });

        axios.post('http://localhost:3000/api/product/getProducts').then(res=>{
       
            if(res.data.success){
                setProducts([...Products,...res.data.products]);
                // console.log('Product Detail')
                // setStart([...Products,...res.data.products]);
                // start=res.data.products;
                // console.log(start)
            }
            else{
                alert('Failed to load Products');
            }
        })

    },[]);

    const renderCards =
        // console.log('HHHH');
        Products.map((p,index)=>{
            // console.log(p.types)
            if(index >= 4)return;
            
                return <Col lg={6} md={8} xs={24}>
                <Card
                    hoverable={true}
                    cover={<a href={`/product/${p._id}`} ><ImageSlider images={p.images} /></a> }
                >
                    <Meta
                        title={p.title}
                        description={`$ ${p.price}`}
                    />
                
                </Card>
            </Col>
        })

    return(
        <div style={{marginTop : 130,marginBottom: 30,display:"flex",flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
            {Product.length===0?<div>{console.log('hello')}</div>:
            <div style={{marginTop:"90px",width:"350px"}}>
                <h1>{Product[0].title}</h1>
                <Card
                hoverable={true}
                cover={ <ImageSlider images={Product[0].images} /> }
                >
                </Card>

            <Descriptions title="Product Info">
                <Descriptions.Item label="Price"> ${Product[0].price}</Descriptions.Item>
                <Descriptions.Item label="People">4</Descriptions.Item>
              
                <Descriptions.Item label="Description"> {Product[0].description}</Descriptions.Item>
            </Descriptions>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger"
                    onClick={()=>addToCartHandler(Product[0])}
                >
                    Book a Guide
                    </Button>
            </div>
           </div>
            }
            {
                Products.length===0?<div></div>:
                (
                    <div style={{marginTop:'30px',width:'75%'}} >
                    <h2>Popular tourist destinations for this time of year</h2>

                    <Row style={{marginTop:"70px"}} gutter={[16, 16]}>
                        {renderCards}
                    </Row>
                   
                    </div>
                )

            }
        </div>
    )


}

export default ProductDetail;