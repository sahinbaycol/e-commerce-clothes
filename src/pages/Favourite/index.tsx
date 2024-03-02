import axios from "axios";
import React, { CSSProperties, useEffect, useState } from "react";
import { clothe } from "../Home";
import Card from "../../components/Card";
import favouriteIcon from "../../assets/star (1).png";
import clickedFavouriteIcon from "../../assets/star (2).png";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../redux/store";
import { addToCart } from "../../redux/productSlice";

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

const Favourite = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const styles = {
    containerStyle:{
      display: "flex",
    flexDirection: "column",
    backgroundColor: "black",
    height: "100vh",
  } as CSSProperties,
    contentContainerStyle: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      backgroundColor: "black",
      height: "fit-content",
      alignItems: "start",
    } as CSSProperties,
    cardStyle: {} as CSSProperties,
  };
  const [favourite, setFavorite] = useState<clothe>();
  const [data, setData] = useState<clothe[]>([]);
  const [isSpinnig, setIsSpinning] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://65d1235bab7beba3d5e4232b.mockapi.io/products"
      );
      console.log(response);
      setData(response.data.filter((item: any) => item.isfavourite === true));
    } catch (error) {}
  };

  const sendFavourite = async (id: clothe["id"]) => {
    const selectedItem = data.find((item) => item.id === id);
    if (selectedItem?.isfavourite === false) {
      setFavorite(selectedItem);
      const favourteData = {
        ...favourite,
        isfavourite: true,
      } as clothe;
      setIsSpinning(true);
      try {
        const responseFavourite = await axios.put(
          `https://65d1235bab7beba3d5e4232b.mockapi.io/products/${id}`,
          favourteData
        );
        fetchData();
        setFavorite(undefined);
      } catch (error) {}
      setIsSpinning(false);
    } else if (selectedItem?.isfavourite === true) {
      setFavorite(selectedItem);
      const favourteData = {
        ...favourite,
        isfavourite: false,
      } as clothe;
      setIsSpinning(true);
      try {
        const responseFavourite = await axios.put(
          `https://65d1235bab7beba3d5e4232b.mockapi.io/products/${id}`,
          favourteData
        );
        fetchData();
        setFavorite(undefined);
      } catch (error) {}
      setIsSpinning(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const content = data.map((item) => {
    return (
      <Card
        spinChild={
          <div>
            {favourite?.id === item.id && <Spin spinning={isSpinnig} />}
          </div>
        }
        isFavourite={
          favourite?.id === item.id
            ? ""
            : item.isfavourite === false
            ? favouriteIcon
            : clickedFavouriteIcon
        }
        handleFavourite={() => {
          sendFavourite(item.id);
        }}
        key={item.id.toString()}
        cardStyle={styles.cardStyle}
        count={item.count}
        rate={item.rate}
        productName={item.name}
        discount={(item.price * (100 - item.discount)) / 100}
        price={item.price}
        imgSource={item.image}
        addToCartElement={
          <StyledButton
            onClick={() => {
              dispatch(addToCart(item));
            }}
            className="cardButton"
          >
            Sepete Ekle
          </StyledButton>
        }
        handlenavigate={() => {
          navigate(`./details/${item.id}`);
        }}
      />
    );
  });

  return <div style={styles.containerStyle}>
    <div style={styles.contentContainerStyle}>
      {content}
      
    </div>
     <div style={{flex:"1",backgroundColor:"black"}}></div>
    </div>;
};

export default Favourite;
