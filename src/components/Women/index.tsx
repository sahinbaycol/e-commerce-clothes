import axios from 'axios';
import React, { CSSProperties, useEffect, useState } from 'react'
import { clothe } from '../../pages/Home';
import Card from '../Card';
import { Spin } from 'antd';
import favouriteIcon from "../../assets/starnavbar.png"
import clickedFavouriteIcon from "../../assets/star (2).png"
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../../redux/store';
import { addToCart } from '../../redux/productSlice';

const StyledButton = styled.button`
  width: 160px;
  height: 40px;
  border: 3px solid #dffd9f;
  border-radius: 8px;
  background-color: black;
  color: #dffd9f;
  font-size: 18px;
  margin-top: 10%;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const Women = () => {

  const navigate=useNavigate();
  const dispatch=useAppDispatch();
  const styles = {
    contentContainerStyle: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      padding:"3%",
      backgroundColor:"black",
      height:"fit content"
    } as CSSProperties,
    cardStyle: {} as CSSProperties,
    backButtonStyle:{
      position:"absolute",
      left:"20px",
      top:"-80px"
    } as CSSProperties
  };

  const [data, setData] = useState<clothe[]>([]);
  const [filteredData, setFilteredData] = useState<clothe[]>([]);
  const [isSpinnig,setIsSpinning]=useState<boolean>(false)
  const [favourite, setFavorites] = useState<clothe>();
  const [datafav, setDataFav] = useState<clothe[]>([]);

  const sendFavourite= async (id:clothe["id"])=>{

    const selectedItem = data.find(item => item.id === id);
    if(selectedItem?.isfavourite===false){
      setFavorites(selectedItem)

      const favourteData={
        ...favourite,
          isfavourite:true
  
      } as clothe
      setIsSpinning(true)
      try {
      
        const responseFavourite= await axios.put(`https://65d1235bab7beba3d5e4232b.mockapi.io/products/${id}`, favourteData )
        fetchData();
        setFavorites(undefined)
  
      } catch (error) {
        
      }
      setIsSpinning(false)
    }
    else if (selectedItem?.isfavourite===true)
    {
      setFavorites(selectedItem)

      const favourteData={
        ...favourite,
          isfavourite:false
  
      } as clothe
      setIsSpinning(true)
      try {
      
        const responseFavourite= await axios.put(`https://65d1235bab7beba3d5e4232b.mockapi.io/products/${id}`, favourteData )
        fetchData();
        setFavorites(undefined)
  
      } catch (error) {
        
      }
      setIsSpinning(false)
    }
    

    

    
  }
      
  useEffect(() => {
    fetchData();
  }, []);
      
    
      const fetchData = async () => {
        try {
          const response = await axios.get("https://65d1235bab7beba3d5e4232b.mockapi.io/products");
          console.log(response);
          setData(response.data.filter((item:clothe)=>item.category==="women"))
          const filtered=data.filter((item:clothe)=>item.category==="women")
          setFilteredData(filtered);
          console.log(data)
          console.log(filteredData)
        } catch (error) {}
      };

      
      const content = data.map((item) => {
        return (
          <div>
            <Card
            spinChild={<div>{favourite?.id === item.id && <Spin  spinning={isSpinnig} />}</div>}
            isFavourite={favourite?.id === item.id ? ""   : item.isfavourite === false ? favouriteIcon : clickedFavouriteIcon}
            handleFavourite={()=>{
              sendFavourite(item.id)
            }}
              key={item.id.toString()}
              cardStyle={styles.cardStyle}
              count={item.count}
              rate={item.rate}
              productName={item.name}
              discount={item.price*(100-item.discount)/100}
              price={item.price}
              imgSource={item.image}
              addToCartElement={<StyledButton onClick={()=>{
                dispatch(addToCart(item))
              }} className="cardButton">Sepete Ekle</StyledButton>}
              handlenavigate={()=>{
                navigate(`../../home/details/${item.id}`)
              }}
            />
          {/* {favourite?.id === item.id && <Spin  spinning={isSpinnig} />} */}
          </div>
        );
      });
      

  return (
    <div style={styles.contentContainerStyle}>
      <StyledButton onClick={()=>{
        navigate(-1)
      }} style={styles.backButtonStyle} className="cardButton">Geri Dön</StyledButton>
      {content}
      </div>
  )
}

export default Women