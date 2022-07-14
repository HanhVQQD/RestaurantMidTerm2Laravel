import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";

export default function IndexUser() {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    await axios.get(`http://localhost:8000/api/categories`).then(({ data }) => {
      setCategories(data);
    });
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    await axios.get(`http://localhost:8000/api/products`).then(({ data }) => {
      setProducts(data);
    });
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <div class="space60">&nbsp;</div>
      <div className="row">
        <div className="col-sm-2">
          <ul className="aside-menu">
            {categories.length > 0 &&
              categories.map((row, key) => (
                <li key={key}>
                  <Link to={`/type/${row.id}`}>{row.name}</Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="col-sm-10">
            {categories.length > 0 &&
            categories.map((row, key) => (
                <div className="beta-products-list">
                    {/* <br /> */}
                    {/* <h1 className="productTypeName">{row.name}</h1> */}
                    {/* <div className="beta-products-details count">

                    </div> */}
                    <div className="row">
                        {categories.length > 0 &&
                        products.map((row, key) => (
                        <div className="single-item col-sm-4">
                            <div className="single-item-header">
                                <a href="product.html">
                                <img
                                    src={`http://localhost:8000/image/${row.image}`}
                                    alt="..."
                                    />
                                </a>
                            </div>
                            <div className="single-item-body">
                                <h5 className="single-item-title">{row.name}</h5>
                                <p className="single-item-price">
                                    <span className="flash-sale">${row.price}</span>
                                    <span className="flash-sale text-decoration-line-through text-muted">${row.promotionPrice}</span>
                                </p>
                            </div>
                            <div className="single-item-caption">
                                <Link className="add-to-cart" to="#"><i className="fa fa-shopping-cart"/></Link>                               
                                <Link to={`/admin/view/${row.id}`} className="btn btn-warning me-2" > View </Link>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
