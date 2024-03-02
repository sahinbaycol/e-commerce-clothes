import axios from "axios";
import React, { CSSProperties, useEffect, useState } from "react";
import Card from "../../components/Card";
import favouriteIcon from "../../assets/star (1).png"
import clickedFavouriteIcon from "../../assets/star (2).png"
import { Spin } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import List from "./List";
import Details from "../Details";

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
  name:string;
  discount:number;
  counter:number
};
const Home = () => {



  return (
        <Routes>
            <Route path="/" element={<List />} />
            <Route path="/details/:id" element={<Details />} />
        </Routes>
  );
};

export default Home;
