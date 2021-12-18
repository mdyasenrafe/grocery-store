import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-black py-4 text-light">
      <Container>
        <Row>
          <Col xs={12} lg={4}>
            <div>
              <h4>About us</h4>
              <p>
                Online Shopping BD has never been easier. grocery-store.bd is
                best online shopping store in Bangladesh that features 10+
                Thousands Groccory products at affordable prices. As
                bangaldesh's online shopping landscape is expanding every year,
                online shopping in dhaka, chittagong, khulna, sylhet and other
                big cities are also gaining momentum.
              </p>
            </div>
          </Col>
          <Col xs={12} lg={4}>
            <div className="pt-4 pt-md-0">
              <h3>Additional Links</h3>
              <ul className="list-unstyled">
                <li>
                  <Link className="coustom-nav-link px-2 py-1" to="/blog">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="coustom-nav-link px-2 py-1" to="/products">
                    Products
                  </Link>
                </li>
                <li>
                  <Link className="coustom-nav-link  px-2 py-1" to="/contact">
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={12} lg={4}>
            <div className="pt-4 pt-md-0">
              <h3>Contact us</h3>
              <div className="d-flex align-items-center">
                <p className="fs-3">
                  <i className="fas fa-phone-square"></i>
                </p>
                <p className="px-3">00115874556</p>
              </div>
              <div className="d-flex align-items-center">
                <p className="fs-3">
                  <i className="far fa-clock"></i>
                </p>
                <p className="px-3">24 Hours Open</p>
              </div>
              <div className="d-flex align-items-center">
                <p className="fs-3">
                  <i className="far fa-envelope"></i>
                </p>
                <p className="px-3">grocerystore@gmail.com</p>
              </div>
            </div>
          </Col>
          <div className="text-center d-block d-md-flex flex-row-reverse justify-content-between align-items-center">
            <div>
              <i className="fab fa-facebook mx-3 cursor-pointor fs-4 pt-3 pt-3"></i>
              <i className="fab fa-youtube mx-3 cursor-pointor fs-4 pt-3 pt-3"></i>
              <i className="fab fa-twitter mx-3 cursor-pointor fs-4 pt-3 pt-3"></i>
              <i className="fab fa-linkedin-in mx-3 cursor-pointor fs-4 pt-3 pt-3"></i>
            </div>
            <div>
              <p className="pt-4">
                © copyright 2021 Chaka - All Rights Reserved
              </p>
            </div>
          </div>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
