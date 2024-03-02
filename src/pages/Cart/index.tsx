import React, { CSSProperties, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store, useAppDispatch } from "../../redux/store";
import {
  ProductSlice,
  addToCart,
  removeToCart,
} from "../../redux/productSlice";
import { Spin } from "antd";
import Card from "../../components/Card";
import { clothe } from "../Home";
import axios from "axios";
import favouriteIcon from "../../assets/starnavbar.png";
import clickedFavouriteIcon from "../../assets/star (2).png";
import { useNavigate } from "react-router-dom";
import downIcon from "../../assets/down.png";
import upIcon from "../../assets/up.png";
import styled from "styled-components";
const StyledButton = styled.button`
  width: 240px;
  height: 60px;
  border: 3px solid #f7b57e;
  border-radius: 8px;
  background-color: black;
  color: #f7b57e;
  font-size: 18px;
  margin-top: 10%;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const Cart = () => {
  const products = useSelector(ProductSlice.selectSlice);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(products);
  }, []);

  const styles = {
    containerStyle: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      padding: "3%",
      backgroundColor: "black",
      height:products.cart.length<5 ? "100vh" : "fit-content" ,
    } as CSSProperties,
    contentContainerStyle: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      padding: "3%",
      backgroundColor: "black",
      height: "fit-content",
    } as CSSProperties,
    cardStyle: {} as CSSProperties,
    countContainerStyle: {
      display: "flex",
      flexDirection: "column",
      marginLeft: "5%",
      alignItems: "center",
    } as CSSProperties,
    counterIconStyle: {
      width: "24px",
      height: "24px",
      cursor: "pointer",
    } as CSSProperties,
    counterTextStyle: {
      color: "white",
    } as CSSProperties,
    totalPriceContainerStyle: {
      display: "flex",
      flexDirection: "column",
      border: "3px solid #ACBBD4",
      borderRadius: "8px",
      padding: "24px 48px",
      margin: "64px",
      height: "fit-content",
    } as CSSProperties,
    totalPriceTextStyle: {
      color: "#F27A1A",
      fontSize: "26px",
      marginTop: "10px",
    } as CSSProperties,
    productsTextStyle:{
      color: "white",
      fontSize: "20px",
      marginTop: "10px",
    } as CSSProperties,
    productsContainerStyle: {
      display: "flex",
      flexDirection: "row",
      minWidth:"250px"
    } as CSSProperties,
  };

  const [isSpinnig, setIsSpinning] = useState<boolean>(false);
  const [favourite, setFavorites] = useState<clothe>();
  const [datafav, setDataFav] = useState<clothe[]>([]);

  const [data, setData] = useState<clothe[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://65d1235bab7beba3d5e4232b.mockapi.io/products"
      );
      console.log(response);
      setData(response.data);
    } catch (error) {}
  };

  const sendFavourite = async (id: clothe["id"]) => {
    const selectedItem = data.find((item) => item.id === id);
    if (selectedItem?.isfavourite === false) {
      setFavorites(selectedItem);

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
        setFavorites(undefined);
      } catch (error) {}
      setIsSpinning(false);
    } else if (selectedItem?.isfavourite === true) {
      setFavorites(selectedItem);

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
        setFavorites(undefined);
      } catch (error) {}
      setIsSpinning(false);
    }
  };

  const content = products.cart.map((item) => {
    return (
      <div>
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
          counter={
            <div style={styles.countContainerStyle}>
              <div>
                <img
                  onClick={() => {
                    dispatch(addToCart(item));
                    console.log(products.totalprice);
                  }}
                  style={styles.counterIconStyle}
                  src={upIcon}
                />
              </div>
              <div style={styles.counterTextStyle}>{item.counter}</div>
              <div>
                <img
                  onClick={() => {
                    dispatch(removeToCart(item));
                    console.log(products.totalprice);
                  }}
                  style={styles.counterIconStyle}
                  src={downIcon}
                />
              </div>
            </div>
          }
          key={item.id.toString()}
          cardStyle={styles.cardStyle}
          count={item.count}
          rate={item.rate}
          productName={item.name}
          price={(item.price * (100 - item.discount)) / 100}
          discount={item.price}
          imgSource={item.image}
          handlenavigate={() => {
            navigate(`../home/details/${item.id}`);
          }}
        />
        {/* {favourite?.id === item.id && <Spin  spinning={isSpinnig} />} */}
      </div>
    );
  });

  return (
    <div style={styles.containerStyle}>
      <div style={styles.contentContainerStyle}>{content}</div>

      <div className="cart" style={styles.totalPriceContainerStyle}>
        <div>
          {products.cart.map((item) => {
            return (
              <div style={styles.productsContainerStyle}>
                <div style={styles.productsTextStyle}>{item.name}</div>
                <div
                  style={{ ...styles.productsTextStyle, marginLeft: "4%" }}
                >
                  {"X" + item.counter}
                </div>
              </div>
            );
          })}
        </div>
        <div style={styles.totalPriceTextStyle}>
          {products.totalprice.toFixed(2) + "TL"}
        </div>
        <StyledButton className="finishShoppingButton">Alışverişi Tamamla</StyledButton>
      </div>
      <div style={{ flex: "1", backgroundColor: "black" }}></div>
    </div>
  );
};

export default Cart;
