import React, { CSSProperties, useEffect, useState } from 'react'
import womenclothes from "../../assets/womenclothesapp2.png"
import menclothes from "../../assets/menclothes2.png"
import electronics from "../../assets/electronicsapp2.png"
import axios from 'axios'
import { clothe } from '../Home'
import { useNavigate } from 'react-router-dom'

const Catalog = () => {

  const navigate=useNavigate();

  const styles={
    catalogContainerStyle: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      padding:"3%",
      backgroundColor:"black",
      height:"100vh",
      
    } as CSSProperties,
    womenClotheStyle:{
      width:"480px",
      height:"270px",
      background: "linear-gradient(45deg,rgba(163, 108, 235, 1) 0%,rgba(42, 103, 161, 1) 50%,rgba(116, 212, 231, 1) 100%)",
      borderRadius:"8px",
      cursor:"pointer"
    } as  CSSProperties,
    menClotheStyle:{
      width:"480px",
      height:"270px",
      background: "linear-gradient(135deg,rgba(222, 185, 83, 1) 0%,rgba(136, 42, 161, 1) 50%,rgba(116, 212, 231, 1) 100%)",
      borderRadius:"8px",
      cursor:"pointer"
    } as  CSSProperties,
    electronicsStyle:{
      width:"480px",
      height:"270px",
      borderRadius:"8px",
      background: "linear-gradient(135deg, rgba(228,231,143,1) 0%, rgba(34,193,195,1) 45%, rgba(189,102,188,1) 100%)",
      cursor:"pointer"
    } as CSSProperties
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



  return (
    <div style={styles.catalogContainerStyle}>
      <img onClick={()=>{
        navigate("./women")
      }} style={styles.womenClotheStyle} src={womenclothes} />
      <img onClick={()=>{
        navigate("./men")
      }} style={styles.menClotheStyle} src={menclothes} />
      <img onClick={()=>{
        navigate("./electronic")
      }} style={styles.electronicsStyle} src={electronics} />
    </div>
  )
}

export default Catalog