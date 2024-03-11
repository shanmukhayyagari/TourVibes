import React, { useEffect, useRef, useState } from 'react';
import './LandingPage.css';
import axios from 'axios';
import { Row,Col,Card,Checkbox,Input,Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

import ImageSlider from '../../utils/ImageSlider';

const { Meta } = Card;

const { Search } = Input;

function LandingPage(){

    const [Products,setProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [start,setStart] = useState([])
    const [sort,setSort] = useState(false);
    const [filter,setFilter] = useState([1,2,3,4]);
    const [search,setSearch] = useState("");
    const [loading,setLoading] = useState(true);

    const help = useRef([]);

    const sortChange = ()=>{

         setSort(!sort);

         // to escape async js I need to do the opposite
        if(sort==true){
            setProducts([...help.current]);
            setFilter([1,2,3,4]);
            return;
        }

        const Dummy =[... Products];

        Dummy.sort((a,b)=>a.price - b.price);

        setProducts(Dummy);

    }

    useEffect(()=>{

        axios.post('api/product/getProducts').then(res=>{
       
            if(res.data.success){
                setProducts([...Products,...res.data.products]);
                setPopularProducts([...popularProducts, ...res.data.products]);
                setStart([...Products,...res.data.products]);
                // start=res.data.products;
                // console.log(start)
                setLoading(false);
                help.current = res.data.products;
            }
            else{
                alert('Failed to load Products');
            }
        })

    },[])

    const renderCardsPopular = popularProducts.map((product,index)=>{
        if(index >= 4)return;
        return <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a href={`/product/${product._id}`} ><ImageSlider images={product.images} /></a> }
            >
                <Meta
                    title={product.title}
                    description={`$ ${product.price}`}
                />
               
            </Card>
        </Col>


    })

    const renderCards = Products.map((product,index)=>{

        return <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a href={`/product/${product._id}`} ><ImageSlider images={product.images} /></a> }
            >
                <Meta
                    title={product.title}
                    description={`$ ${product.price}`}
                />
               
            </Card>
        </Col>


    })

    const handleChange = (num)=>{

        setSort(false);
        var help = [...filter];
        if(filter.indexOf(num)=== -1)help.push(num);

        else help.splice(filter.indexOf(num),1);

        // console.log(help);

        setFilter([...help]);
        const change = [...start];

        const arrange=[];

        for(let i=0;i<change.length;i++){
            if(change[i].types === "asia" && help.indexOf(1)===-1)continue;
            else if(change[i].types === 'europe' && help.indexOf(2)===-1)continue;
            else if(change[i].types === 'america' && help.indexOf(3)===-1)continue;
            else if(change[i].types === 'australia' && help.indexOf(4)===-1)continue;

            else arrange.push(change[i]);

        }

        setProducts([...arrange]);

    }

    const searchChange = (e)=>{
        setSearch(e.target.value)

        axios.post('api/product/getProducts',{term:e.target.value}).then(res=>{
       
            if(res.data.success){
                setProducts([...res.data.products]);
                setStart([...res.data.products]);
            }
            else{
                alert('Failed to load Products');
            }
        })
    }
  

    return (
    
        <div  style={{ width: '75%', margin: '0rem auto',marginTop:"160px",marginBottom:30 }}>
            {loading?<Button type="primary" icon={<PoweroffOutlined />} loading />:(<div>
            <div style={{ textAlign: 'center'}}>
                <h2>    Let's Travel Anywhere  </h2>
            </div>

            <div style={{marginTop:"30px"}} >
                <Checkbox type="checkbox" checked={filter.indexOf(1)===-1?false:true} onChange={()=>handleChange(1)}>Asia</Checkbox>
                <Checkbox type="checkbox" checked={filter.indexOf(2)===-1?false:true} onChange={()=>handleChange(2)}>Europe</Checkbox>
                <Checkbox type="checkbox" checked={filter.indexOf(3)===-1?false:true} onChange={()=>handleChange(3)}>America</Checkbox>
                <Checkbox type="checkbox" checked={filter.indexOf(4)===-1?false:true} onChange={()=>handleChange(4)}>Australia</Checkbox>
            </div>

            <Search
                placeholder="Search"
                value={search}
                onChange={(e)=>searchChange(e)}
                style={{width:"250px"}}
            >

            </Search>

           {Products.length==0?

                <div>
                    No posts yet...
                </div>
            :
                <div>
                   

                    <Checkbox type="checkbox" checked={sort}onChange={()=>sortChange()}>Sort by prices</Checkbox>
               
                   <Row style={{marginTop:"70px"}}gutter={[16, 16]}>
                   

                        {renderCards}

                    </Row>
                </div>

           }
            {
                popularProducts.length===0?<div></div>:
                (
                    <div style={{marginTop:'30px',width:'100%'}} >
                    <h2>Popular tourist destinations for this time of year</h2>

                    <Row style={{marginTop:"70px"}} gutter={[16, 16]}>
                        {renderCardsPopular}
                    </Row>
                   
                    </div>
                )

            }
          </div>)
        }
        </div>
    )
}

export default LandingPage;