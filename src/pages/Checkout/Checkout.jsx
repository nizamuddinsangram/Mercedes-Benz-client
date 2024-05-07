import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";

import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
const Checkout = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);
  const { title, _id, price, img } = data;
  // console.log(data);
  const handleBookService = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = user?.email;
    const booking = {
      customerName: name,
      email: email,
      date,
      service_title: title,
      service: _id,
      price: price,
      image: img,
    };
    // console.log(booking);
    axios
      .post("https://mercedes-benz-server.vercel.app/bookings", booking)
      .then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
          toast.success("booking a new car");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div>
      <h2 className="text-center text-3xl">Book Service: {title} </h2>
      <form onSubmit={handleBookService}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              defaultValue={user?.displayName}
              name="name"
              required
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              type="date"
              name="date"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              name="email"
              defaultValue={user?.email}
              placeholder="email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Due amount</span>
            </label>
            <input
              type="text"
              defaultValue={"$" + price}
              className="input input-bordered"
            />
          </div>
        </div>
        <div className="form-control mt-6">
          <input
            className="btn bg-teal-600 text-gray-100 btn-block"
            type="submit"
            value="Order Confirm"
          />
        </div>
      </form>
      <div className="card-body"></div>
    </div>
  );
};

export default Checkout;
