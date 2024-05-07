import { Link } from "react-router-dom";
const OurProductCard = ({ product }) => {
  const { description, img, price, title, _id } = product;

  return (
    <div className="w-full my-10 max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <img
        className="object-cover object-center w-full h-44"
        src={img}
        alt="avatar"
      />

      <div className="flex items-center px-6 py-3 bg-gray-900">
        <h1 className="mx-3 text-lg font-semibold text-white">Booking car</h1>
      </div>

      <div className=" pt-3 p-2">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h1>

        <div className="flex items-center justify-center  mt-2 mb-3 text-gray-700 dark:text-gray-200">
          <Link
            to={`/book/${_id}`}
            className="btn btn-sm w-full text-gray-100 bg-teal-400"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OurProductCard;
