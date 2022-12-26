import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

// fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(
      "https://grocery-store-api-y99i.onrender.com/products"
    ).then((res) => res.json());
    return response.data;
  }
);
// fetch cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await fetch(
    "https://grocery-store-api-y99i.onrender.com/cart"
  ).then((res) => res.json());
  return response.data;
});
// slice
const Slice = createSlice({
  name: "book",
  initialState: {
    productsList: [],
    cartList: [],
    status: "idle",
  },
  reducers: {
    addToList: (state, { payload }) => {
      state.cartList.push(payload);
    },
    removeFormCartList: (state, { payload }) => {
      state.cartList = state.cartList.filter((book) => book.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productsList.push(action.payload);
      state.status = "success";
    });
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cartList.push(action.payload);
      state.status = "success";
    });
    builder.addCase(fetchCart.pending, (state, action) => {
      state.status = "pending";
    });
  },
});

export const { addToList, removeFormCartList } = Slice.actions;

export default Slice.reducer;
