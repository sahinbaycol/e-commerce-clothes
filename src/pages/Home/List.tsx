import axios from "axios";
import React, { CSSProperties, useEffect, useState } from "react";
import Card from "../../components/Card";
import favouriteIcon from "../../assets/starnavbar.png"
import clickedFavouriteIcon from "../../assets/star (2).png"
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { addToCart } from "../../redux/productSlice";
import styled from "styled-components";

export type clothe = {
  id: number;
  description: string;
  category: string;
  image: string;
  price: number;
  count: number;
  rate: number;
  title: string;
  isfavourite:boolean;
  discount:number;
  name:string;
  counter:number;
};

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
const List = () => {

  const dispatch=useAppDispatch();
  const navigate=useNavigate();
  const styles = {
    contentContainerStyle: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      backgroundColor:"black",
      height:"fit-content"
    } as CSSProperties,
    cardStyle: {} as CSSProperties,
  };

  const [isSpinnig,setIsSpinning]=useState<boolean>(false)
  const [favourite, setFavorites] = useState<clothe>();
  const [datafav, setDataFav] = useState<clothe[]>([]);
  // const handleFavorite = (id: number) => {
  //   const selectedItem = data.find(item => item.id === id);
  //   if (selectedItem) {
  //     const isFavoriteCard = favorites.some(item => item.id === id);
  //     if (isFavoriteCard) {
  //       // Remove from favorites if already favorited
  //       setFavorites(prevFavorites =>
  //         prevFavorites.filter(item => item.id !== id)
  //       );
  //     } else {
  //       // Add to favorites if not favorited
  //       setFavorites(prevFavorites => [...prevFavorites, selectedItem]);
  //     }
  //   }
  // };

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
  const [data, setData] = useState<clothe[]>([]);

  

  const fetchData = async () => {
    try {
      const response = await axios.get("https://65d1235bab7beba3d5e4232b.mockapi.io/products");
      console.log(response);
      setData(response.data);
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
          price={item.price*(100-item.discount)/100}
          discount={item.price}
          imgSource={item.image}
          addToCartElement={<StyledButton onClick={()=>{
            dispatch(addToCart(item))
          }} className="cardButton">Sepete Ekle</StyledButton>}
          handlenavigate={()=>{
            navigate(`./details/${item.id}`)
          }}
        />
      {/* {favourite?.id === item.id && <Spin  spinning={isSpinnig} />} */}
      </div>
    );
  });

  return <div style={styles.contentContainerStyle}>{content}</div>;
};

export default List;
