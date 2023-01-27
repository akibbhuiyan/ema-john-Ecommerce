import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import {
  getDatabaseCart,
  proccessOrder,
} from "../../utilities/databaseManager";
import ProccessPayment from "../ProccessPayment/ProccessPayment";
import "./Shipment.css";

const Shipment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = (data) => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      product: savedCart,
      shipment: data,
      orderTime: new Date(),
    };
    fetch("https://ema-john-server-rho.vercel.app/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("Your order placed successfully");
          proccessOrder();
        }
      });
  };
  console.log(loggedInUser);
  return (
    <div className="row">
      <div className="col-md-6">
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Enter Your Name"
            defaultValue={loggedInUser.name}
            {...register("name", { required: true })}
          />
          {errors.name && <span className="error">Name is required</span>}
          <input
            placeholder="Enter Your Email"
            defaultValue={loggedInUser.email}
            {...register("email", { required: true })}
          />
          {errors.email && <span className="error">Email is required</span>}
          <input
            placeholder="Address Line 1"
            {...register("address", { required: true })}
          />
          {errors.address && <span className="error">Address is required</span>}
          <input placeholder="Address Line 2" {...register("phone")} />
          <input
            placeholder="City"
            {...register("phone", { required: true })}
          />
          {errors.phone && <span className="error">City Name is required</span>}
          <input
            placeholder="Country"
            {...register("phone", { required: true })}
          />
          {errors.phone && <span className="error">Country is required</span>}
          <input
            placeholder="Zip Code"
            {...register("phone", { required: true })}
          />
          {errors.phone && <span className="error">Zip Code is required</span>}
          <textarea
            placeholder="Your Message"
            name="message"
            {...register("textarea", { required: false })}
          />
          <input type="submit" />
        </form>
      </div>
      <div className="col-md-6">
        <ProccessPayment />
      </div>
    </div>
  );
};

export default Shipment;
