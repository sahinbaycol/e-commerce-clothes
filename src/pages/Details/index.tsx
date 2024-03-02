import axios from "axios";
import React, { CSSProperties, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { clothe } from "../Home";
import clickedFavouriteIcon from "../../assets/star (2).png";
import rateWhiteIcon from "../../assets/starnavbar.png";
import styled from "styled-components";


const StyledButton = styled.button`
  width: 100%;
  height: 60px;
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

interface MyComponentProps {
  repeat: number;
}

const Details = () => {
  const styles = {
    containerStyle: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      backgroundColor: "black",
      height: "100vh",
    } as CSSProperties,
    productContainerStyle: {
      display: "flex",
      flexDirection: "row",
      marginLeft:"10%",
      marginTop:"4%",
      height: "700px",
    } as CSSProperties,
    productBigImageStyle: {
      width: "300px",
      height: "500px",
      objectFit: "contain",
      padding: "15px",
      backgroundColor: "white",
      borderRadius: "8px",
    } as CSSProperties,
    imageContainerStyle: {
      border: "3px solid #95f3ed",
      borderRadius: "8px",
      padding: "64px 64px 24px 64px",
      margin: "16px",
    } as CSSProperties,
    productDescriptionStyle: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      margin: "16px",
    } as CSSProperties,
    nameStyle: {
      color: "white",
      fontSize:"24px"
    } as CSSProperties,
    rateStarStyle: {
      width: "16px",
      height: "16px",
      marginLeft: "5px",
    } as CSSProperties,
    rateContainerStyle: {
      display: "flex",
      flexDirection: "row",
      marginTop: "5%"
    } as CSSProperties,
    countStyle: {
      fontSize: "15px",
      color: "white",
      marginLeft: "10px",
    } as CSSProperties,
    priceStyle: {
      fontSize: "20px",
      marginTop: "5%",
      color: "white",
      display: "flex",
      flexDirection: "row",
      width: "100%",
    } as CSSProperties,
    descriptionStyle:{
      color:"white",
      fontSize:"16px",
      marginLeft:"10px"
    } as CSSProperties,
    descriptionContainerStyle:{
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      marginTop:"6%"
    } as CSSProperties,
    dotStyle:{
      width:"8px",
      height:"8px",
      backgroundColor:"gold",
      borderRadius:"50%"
    } as CSSProperties
  };

  const [data, setData] = useState<clothe>();

  const { id } = useParams();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://65d1235bab7beba3d5e4232b.mockapi.io/products/${id}`
      );
      setData(response.data);

      console.log(response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    <div style={styles.containerStyle}>
      {data && (
        <div style={styles.productContainerStyle}>
          <div className="cardDetail" style={styles.imageContainerStyle}>
            <img src={data?.image} style={styles.productBigImageStyle} />
          </div>
          <div style={styles.productDescriptionStyle}>
            <div style={styles.nameStyle}>{data.name}</div>
            <div style={styles.rateContainerStyle}>
              <RateComponent repeat={Math.round(data.rate / 20)} />
              <RateLeftComponent repeat={Math.round(5 - data.rate / 20)} />
              <div style={styles.countStyle}>{"(" + data.count + ")"}</div>
            </div>
            <div style={styles.priceStyle}>
              <div>
                <del>{data.price + " " + "TL"}</del>
              </div>
              <div style={{marginLeft:"25px"}}>
                {(data.price * (100 - data.discount)) / 100 + " " + "TL"}
              </div>
            </div>
            <hr style={{width:"100%",marginTop:"10%"}}/>
            <div><StyledButton className="cardButton">Sepete Ekle</StyledButton></div>
            <div style={styles.descriptionContainerStyle}>
              <div style={styles.dotStyle}></div>
              <div style={styles.descriptionStyle}>İncelemiş olduğunuz ürünün satış fiyatını satıcı belirlemektedir.</div>
            </div>
            <div style={styles.descriptionContainerStyle}>
              <div style={styles.dotStyle}></div>
              <div style={styles.descriptionStyle}>15 gün içinde ücretsiz iade.</div>
            </div>
            <div style={styles.descriptionContainerStyle}>
              <div style={styles.dotStyle}></div>
              <div style={styles.descriptionStyle}>Bu üründen en fazla 10 adet sipariş verilebilir.</div>
            </div>
            <div style={styles.descriptionContainerStyle}>
              <div style={styles.dotStyle}></div>
              <div style={styles.descriptionStyle}>Bir ürün, birden fazla satıcı tarafından satılabilir.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
