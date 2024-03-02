import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { clothe } from "../pages/Home";
import { act } from "react-dom/test-utils";
import Item from "antd/es/list/Item";



type ProductState= {
    
    value:number[]
    cart:clothe[];
    totalprice:number;
}


const initialState:ProductState={
    value:[],
    cart:[],
    totalprice:0
}

export const ProductSlice=createSlice({
    name:"products",
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<clothe>)=>{
            state.totalprice = 0;

            if(state.cart.find(item=>item.id === action.payload.id)){
                let alreadyExists = state.cart.find(item => item.id === action.payload.id);
                if(alreadyExists){
                    alreadyExists.counter+=1
                }

               
            } else{
                let currentArray= state.cart.push(action.payload)

                console.log(currentArray)
                // let currentArray=state.cart.push(action.payload)
                
            }
            
            
        //    let totalPriceValue=state.value.push(action.payload.counter*(action.payload.price*(100-action.payload.discount)/100))

        state.cart.forEach((item) => {
            state.totalprice += item.counter * (item.price * (100 - item.discount)) / 100;
        });
        
        //    let total=state.totalprice= state.cart.reduce((accumulator, currentValue) => accumulator. + currentValue,0);
        //     // let values = state.cart.reduce((item) =>item= + (item.counter*item.price));
        //     console.log(totalPriceValue,total)

        
        
        },
        removeToCart:(state,action:PayloadAction<clothe>)=>{

            state.totalprice = 0;
            let itemToRemove = state.cart.find(item => item.id === action.payload.id);
            itemToRemove ? itemToRemove.counter > 1 ? itemToRemove.counter-- : state.cart = state.cart.filter(item => item.id !== itemToRemove?.id) : console.log("Sepette böyle bir öge bulunmamakta")
            state.cart.forEach((item) => state.totalprice += item.counter*(item.price * (100 - item.discount)) / 100)

            // let itemToRemove = state.cart.find(item => item.id === action.payload.id);
            // state.cart.slice(findIndex(action.payload))
            // state.value.slice(indexOf(action.payload))
        }
    }
})


export default ProductSlice.reducer

export const {addToCart,removeToCart} =ProductSlice.actions

function indexOf(payload: clothe): number | undefined {
    throw new Error("Function not implemented.");
}
