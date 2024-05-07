import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";
import MyBookingRow from "./MyBookingRow";
const MyBookings = () => {
  const { user, loading } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const axiosSecure = UseAxiosSecure();

  // const url = `http://localhost:8000/myBooking/${user?.email}`;

  useEffect(() => {
    if (user?.email) {
      const url = `/myBooking/${user?.email}`;
      axiosSecure.get(url).then((res) => {
        setBookings(res.data);
      });
    }
  }, [user?.email, axiosSecure]);
  // console.log(bookings);
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/myBooking/${id}`).then((res) => {
      console.log(res.data);
      const remaining = bookings.filter((booking) => booking._id !== id);
      setBookings(remaining);
    });
  };
  const handleBookingConfirm = (id) => {
    axios
      .patch(`http://localhost:8000/myBooking/${id}`, { status: "confirm" })
      .then((data) => {
        console.log(data.data);
        if (data.data.modifiedCount > 0) {
          console.log("updated bookings");
          const remaining = bookings.filter((booking) => booking._id !== id);
          const updated = bookings.find((booking) => booking._id === id);
          updated.status = "confirm";
          const newBookings = [updated, ...remaining];
          setBookings(newBookings);
        }
      });
  };
  return (
    <div>
      <h2 className="text-5xl">Your bookings:{bookings.length} </h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Image</th>
              <th>Service</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <MyBookingRow
                key={booking._id}
                booking={booking}
                handleDelete={handleDelete}
                handleBookingConfirm={handleBookingConfirm}
              ></MyBookingRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
