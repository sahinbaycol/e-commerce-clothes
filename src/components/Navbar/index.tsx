import React, { CSSProperties } from "react";
import styled from "styled-components";
import homeIcon from "../../assets/home (1).png";
import catalogIcon from "../../assets/category.png"
import favouriteIcon from "../../assets/starnavbar.png"
import contactIcon from "../../assets/letter (2).png"
import cartIcon from "../../assets/shopping-cart2.png"
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { ProductSlice } from "../../redux/productSlice";

const StyledButtonHome = styled.button`
  width: 160px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 3px solid #98c6f5;
  border-radius: 12px;
  background-color: black;
  justify-content: center;
  -webkit-box-shadow: 0px 0px 36px 4px #4b8ed1;
  -moz-box-shadow: 0px 0px 36px 4px #4b8ed1;
  box-shadow: 0px 0px 36px 4px #4b8ed1;
  &:hover {
    background-color:#4d4d4d;
  }
`;

const StyledButtonCatalog = styled.button`
  width: 160px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 3px solid #f5abff;
  border-radius: 12px;
  background-color: black;
  justify-content: center;
  -webkit-box-shadow: 0px 0px 36px 4px #da81e6;
  -moz-box-shadow: 0px 0px 36px 4px #da81e6;
  box-shadow: 0px 0px 36px 4px #da81e6;
  &:hover {
    background-color:#4d4d4d;
  }
`;

const StyledButtonFavourite = styled.button`
  width: 160px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 3px solid #ff8a8a;
  border-radius: 12px;
  background-color: black;
  justify-content: center;
  -webkit-box-shadow: 0px 0px 36px 4px #f50a21;
  -moz-box-shadow: 0px 0px 36px 4px #f50a21;
  box-shadow: 0px 0px 36px 4px #f50a21;
  &:hover {
    background-color:#4d4d4d;
  }
`;

const StyledButtonContact = styled.button`
  width: 160px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 3px solid #ffb866;
  border-radius: 12px;
  background-color: black;
  justify-content: center;
  -webkit-box-shadow: 0px 0px 36px 4px #ff9b29;
  -moz-box-shadow: 0px 0px 36px 4px #ff9b29;
  box-shadow: 0px 0px 36px 4px #ff9b29;
  &:hover {
    background-color:#4d4d4d;
  }
`;
const StyledButtonCart = styled.button`
  width: 160px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 3px solid #dffd9f;
  border-radius: 12px;
  background-color: black;
  justify-content: center;
  -webkit-box-shadow: 0px 0px 21px 7px #8FC839;
    -moz-box-shadow: 0px 0px 21px 7px #8FC839;
    box-shadow: 0px 0px 21px 7px #8FC839;
  &:hover {
    background-color:#4d4d4d;
  }
`;

const Navbar = () => {

  const products = useSelector(ProductSlice.selectSlice);
  const dispatch = useAppDispatch();

  const styles = {
    navbarContainerStyle: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent:"center",
      backgroundColor:"#03032E",
      padding:"30px 0"
    } as CSSProperties,
    iconStyle: {
      width: "24px",
      height: "24px",
      marginLeft: "20px",
    } as CSSProperties,
    buttonContainerStyle:{
      marginLeft:"20px"
    } as CSSProperties,
    headerContainerStyle:{
      display:"flex",
      flexDirection:"row",
      alignItems:"center"
    } as CSSProperties,
    text1Style:{
      fontSize: "26px",
      fontWeight: "600",
      color: "white",
    } as CSSProperties,
    text2Style:{
      fontSize: "26px",
      fontWeight: "600",
      color: "#db1435",
      marginLeft: "20px",
    } as CSSProperties,
    buttonHomeTextStyle:{
      fontSize:"18px",
      color:"#98c6f5"
    } as CSSProperties,
    buttonCatalogTextStyle:{
      fontSize:"18px",
      color:"#f5abff"
    } as CSSProperties,
    buttonFavouriteTextStyle:{
      fontSize:"18px",
      color:"#ff8a8a"
    } as CSSProperties,
    buttonContactTextStyle:{
      fontSize:"18px",
      color:"#ffb866"
    } as CSSProperties,
    buttonCartTextStyle:{
      fontSize:"18px",
      color:"#dffd9f",
      marginLeft:"10px"
    } as CSSProperties,
    cartValueContainerStyle:{
      width:"24px",
      height:"24px",
      backgroundColor:"#dffd9f",
      borderRadius:"50%",
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"center"
    } as CSSProperties,
    cartValueTextStyle:{
      fontSize:"18px",
      fontWeight:"600"
    } as CSSProperties
    
  };

  const navigate=useNavigate();



  return (
    <div style={styles.navbarContainerStyle}>
      <div style={styles.headerContainerStyle}>
        <div style={styles.text1Style}>SahinBycl</div>
        <div style={styles.text2Style}>Commerce</div>
      </div>
      <div style={styles.buttonContainerStyle}>
        <StyledButtonHome onClick={()=>{
          navigate("/home")
        }}>
          <div style={styles.buttonHomeTextStyle}>Home</div>
          <div>
            <img style={styles.iconStyle} src={homeIcon} alt="noPic" />
          </div>
        </StyledButtonHome>
      </div>
      <div style={styles.buttonContainerStyle}>
        <StyledButtonCatalog onClick={()=>{
          navigate("/catalog")
        }}>
          <div style={styles.buttonCatalogTextStyle}>Catalog</div>
          <div>
            <img style={styles.iconStyle} src={catalogIcon} alt="noPic" />
          </div>
        </StyledButtonCatalog>
      </div>
      <div style={styles.buttonContainerStyle}>
        <StyledButtonFavourite onClick={()=>{
          navigate("/favourite")
        }}>
          <div  style={styles.buttonFavouriteTextStyle}>Favourites</div>
          <div>
            <img style={styles.iconStyle} src={favouriteIcon} alt="noPic" />
          </div>
        </StyledButtonFavourite>
      </div>
      <div style={styles.buttonContainerStyle}>
        <StyledButtonContact onClick={()=>{
          navigate("/contact")
        }}>
          <div style={styles.buttonContactTextStyle}>Contact</div>
          <div>
            <img style={styles.iconStyle} src={contactIcon} alt="noPic" />
          </div>
        </StyledButtonContact>
        
      </div>
      <div style={styles.buttonContainerStyle}>
        <StyledButtonCart className="cardDetail" onClick={()=>{
          navigate("/cart")
        }}>
          <div style={styles.cartValueContainerStyle}>
            <div style={styles.cartValueTextStyle}>{products.cart.length}</div>
          </div>
          <div style={styles.buttonCartTextStyle}>Cart</div>
          <div>
            <img style={styles.iconStyle} src={cartIcon} alt="noPic" />
          </div>
        </StyledButtonCart>
      </div>
    </div>
  );
};

export default Navbar;
