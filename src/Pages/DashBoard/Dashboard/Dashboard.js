import React from "react";
import { Row, Col } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <section>
        <Row>
          <Col xs={12} md={3}>
            <div className="bg-dark h-100 text-light py-5">
              <ul className="list-unstyled">
                <li>
                  <Link
                    to="/dashboard/my-orders"
                    className="coustom-nav-link px-2 my-2"
                  >
                    My orders
                  </Link>
                </li>
                <li>
                  <Link
                    className="coustom-nav-link px-2 my-2"
                    to="/dashboard/pay"
                  >
                    Pay
                  </Link>
                </li>
                <li>
                  <Link
                    className="coustom-nav-link px-2 my-2"
                    to="/dashboard/add-review"
                  >
                    Add Review
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={12} md={9} className="py-5">
            <Outlet></Outlet>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Dashboard;
