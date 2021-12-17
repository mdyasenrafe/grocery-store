import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Banner.css";

const Banner = () => {
  const bannerData = [
    {
      title: "Specialist in the",
      title2: "grocery store",
      image: "https://i.ibb.co/72vBB3j/banner-1.jpg",
      price: 2,
    },
    {
      title: "Quality",
      title2: "Freshness ",
      title3: "Guaranteed!",
      image: "https://i.ibb.co/cCZ02r9/banner-2.jpg",
      price: 4,
    },
    {
      title: "Feed your",
      title2: " family the best",
      image: "https://i.ibb.co/Thqckqk/banner-3.jpg",
      price: 3,
    },
  ];

  return (
    <>
      <Carousel fade>
        {bannerData.map((data) => (
          <Carousel.Item key={data.title}>
            <section
              className="banner d-flex align-items-center"
              style={{ height: "700px", backgroundImage: `url(${data.image})` }}
            >
              <div className="text-light  container banner-text px-4 px-sm-4 px-md-0">
                <p>
                  Exclusive offer <span className="text-danger">-20%</span>
                </p>
                <h1 className="fw-bold mb-4">
                  <span>{data.title}</span>
                  <br />
                  <span>{data.title2}</span>
                  <br />
                  <span>{data?.title3}</span>
                </h1>
                <h5 className="mb-4">
                  <span>from</span>
                  <span className="text-danger price-text-size">
                    {" "}
                    ${data.price}
                  </span>
                </h5>
                <Link to="/products">
                  <button className="btn bg-danger text-light">Shop Now</button>
                </Link>
              </div>
            </section>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default Banner;
