import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";

export default function View() {
  const [inputs, setInputs] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    await axios
      .get(`http://localhost:8000/api/products/${id}`)
      .then(({ data }) => {
        setInputs(data);
      });
  };

  return (
    <div className="card_Detail" style={{ width: "30rem" }}>
        <div className="left_detail_admin">
            <img
            src={`http://localhost:8000/image/${inputs.image}`}
            className="imageLeft"
            alt="..."
            />
        </div>
        <div className="right_detail_admin">
            <h4 className="text-center">
                <b>{inputs.name}</b>
            </h4>
            <div>
                <b> Description:</b> {inputs.description}
            </div>
            <br />
            <div>
                <b>Price: </b> ${inputs.price}
            </div>
            <br />
            <div>
                <b> Promotion Price </b> ${inputs.promotionPrice}
            </div>
        </div>
    </div>
  );
}
