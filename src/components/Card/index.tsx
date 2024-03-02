import React, { CSSProperties, useState } from "react";
import styled from "styled-components";
import "../../App.css";
import favouriteIcon from "../../assets/star (1).png";
import clickedFavouriteIcon from "../../assets/star (2).png";
import rateWhiteIcon from "../../assets/starnavbar.png";

import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { addToCart } from "../../redux/productSlice";
import { current } from "@reduxjs/toolkit";
interface MyComponentProps {
  repeat: number;
}

type CardProps = {
  price: number;
  imgSource: string;
  cardStyle: CSSProperties;
  handleFavourite: () => void;
  isFavourite: string;
  spinChild?: React.JSX.Element;
  handlenavigate: () => void;
  discount: number;
  productName: string;
  rate: number;
  count: number;
  counter?: React.JSX.Element;
  addToCartElement?:React.JSX.Element
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

const Card = ({
  price,
  imgSource,
  cardStyle,
  handleFavourite,
  isFavourite,
  spinChild,
  handlenavigate,
  discount,
  productName,
  rate,
  count,
  counter,
  addToCartElement
}: CardProps) => {


  
  const styles = {
    cardContainerStyle: {
      display: "flex",
      flexDirection: "column",
      border: "3px solid #95f3ed",
      borderRadius: "8px",
      alignItems: "center",
      justifyContent: "center",
      padding: "64px 64px 24px 64px",
      margin: "16px",
    } as CSSProperties,
    imageStyle: {
      width: "150px",
      height: "150px",
      objectFit: "contain",
      padding: "15px",
      backgroundColor: "white",
      borderRadius: "8px",
    } as CSSProperties,
    favouriteIconStyle: {
      width: "24px",
      height: "24px",
      cursor: "pointer",
      marginLeft: "25%",
    } as CSSProperties,
    rateStarStyle: {
      width: "16px",
      height: "16px",
      marginLeft: "5px",
    } as CSSProperties,
    imageFavouriteIconContainerStyle: {
      display: "flex",
      flexDirection: "row",
    } as CSSProperties,
    priceStyle: {
      fontSize: "20px",
      marginTop: "5%",
      color: "white",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: "100%",
    } as CSSProperties,
    productNameStyle: {
      fontSize: "20px",
      marginTop: "5%",
      color: "white",
    } as CSSProperties,
    rateContainerStyle: {
      display: "flex",
      flexDirection: "row",
      marginTop: "5px",
    } as CSSProperties,
    countStyle:{
      fontSize: "15px",
      color: "white",
      marginLeft:"10px"
    } as CSSProperties,
    
  };

  const RateComponent: React.FC<MyComponentProps> = ({ repeat }) => {
    const elements: JSX.Element[] = Array.from(
      { length: repeat },
      (_, index) => (
        <img
          key={index}
          style={styles.rateStarStyle}
          src={clickedFavouriteIcon}
        />
      )
    );

    return (
      <div style={{ display: "flex", flexDirection: "row" }}>{elements}</div>
    );
  };

  const RateLeftComponent: React.FC<MyComponentProps> = ({ repeat }) => {
    const elements: JSX.Element[] = Array.from(
      { length: repeat },
      (_, index) => (
        <img key={index} style={styles.rateStarStyle} src={rateWhiteIcon} />
      )
    );

    return (
      <div style={{ display: "flex", flexDirection: "row" }}>{elements}</div>
    );
  };

  return (
    <div
      className="card"
      style={{ ...styles.cardContainerStyle, ...cardStyle }}
    >
      <div style={styles.imageFavouriteIconContainerStyle}>
        <div>
          <img style={styles.imageStyle} src={imgSource} />
        </div>
        
        <img
          style={styles.favouriteIconStyle}
          onClick={() => {
            handleFavourite();
          }}
          src={isFavourite}
        />
        {spinChild}
      </div>
      <div style={{
        marginTop:"10px"
      }}>
        {counter}
      </div>
      <div style={styles.productNameStyle}>{productName}</div>
      <div style={styles.rateContainerStyle}>
        <RateComponent repeat={Math.round(rate / 20)} />
        <RateLeftComponent repeat={Math.round(5 - rate / 20)} />
        <div style={styles.countStyle}>{"("+count+")"}</div>
      </div>
      <div style={styles.priceStyle}>
        <div>
          <del>{discount + " " + "TL"}</del>
        </div>
        <div>{price + " " + "TL"}</div>
      </div>
      
      {addToCartElement}
      <StyledButton
        className="cardButton"
        onClick={() => {
          handlenavigate();
        }}
      >
        Detaylar
      </StyledButton>
    </div>
  );
};

export default Card;
