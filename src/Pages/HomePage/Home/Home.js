import React from "react";
import Banner from "../Banner/Banner";
import BestSellers from "../BestSellers/BestSellers";
import NewProducts from "../NewProducts/NewProducts";
import Reviews from "../Reviews/Reviews";

const Home = () => {
  return (
    <div>
      <Banner />
      <BestSellers />
      <NewProducts />
      <Reviews />
    </div>
  );
};

export default Home;
