import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";

export default function IndexAdmin() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    await axios.get(`http://localhost:8000/api/products`).then(({ data }) => {
      setProducts(data);
    });
  };

  const deleteProduct = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    await axios
      .delete(`http://localhost:8000/api/products/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        fetchProducts();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Link
            className="btn btn-primary mb-2 float-end"
            to={"/product/create"}
          >
            Create Product
          </Link>
        </div>
        <div className="col-12">
          <div className="card card-body">
            <div className="table-responsive">
              <table className="table table-bordered mb-0 text-center">
                <thead>
                  <tr>
                    <th>
                      <h5>
                        {" "}
                        <b>Name</b>{" "}
                      </h5>
                    </th>
                    <th>
                      <h5>
                        {" "}
                        <b>Image</b>{" "}
                      </h5>
                    </th>
                    <th>
                      <h5>
                        {" "}
                        <b>Price</b>{" "}
                      </h5>
                    </th>
                    <th>
                      <h5>
                        {" "}
                        <b>Promotion Price</b>{" "}
                      </h5>
                    </th>
                    <th>
                      <h5>
                        {" "}
                        <b>Description</b>{" "}
                      </h5>
                    </th>
                    <th>
                      <h5>
                        {" "}
                        <b>Quantity</b>{" "}
                      </h5>
                    </th>
                    <th>
                      <h5>
                        {" "}
                        <b>Id Type</b>{" "}
                      </h5>
                    </th>
                    <th>
                      <h5>
                        {" "}
                        <b>Actions</b>{" "}
                      </h5>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 &&
                    products.map((row, key) => (
                      <tr key={key}>
                        <td className="id">
                          <h6>{row.id}</h6>
                        </td>
                        <td className="name">
                          <h6>{row.name}</h6>
                        </td>
                        <td>
                          <img
                            width="200px"
                            height="220px"
                            alt=""
                            src={`http://localhost:8000/image/${row.image}`}
                          />
                        </td>
                        <td className="price">${row.price}</td>
                        <td className="promotionPrice"></td>
                        <td className="description">{row.description}</td>
                        <td className="Quantity">{row.quantity}</td>
                        <td className="id_type">{row.id_type}</td>
                        <td>
                          <Link
                            to={`/admin/view/${row.id}`}
                            className="btn btn-warning me-2"
                          >
                            View
                          </Link>
                          <Link
                            to={`/product/edit/${row.id}`}
                            className="btn btn-success me-2"
                          >
                            Edit
                          </Link>
                          <Button
                            variant="danger"
                            onClick={() => deleteProduct(row.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
