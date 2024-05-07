import axios from "axios";
import { useEffect, useState } from "react";
import OurProductCard from "./OurProductCard";
const OurProduct = () => {
  const [products, setProduct] = useState();
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("http://localhost:8000/products");
      setProduct(data);
    };
    getData();
  }, []);
  // console.log(products);
  return (
    <div className="mt-4">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-orange-600">Our Product</h3>
        <h2 className="text-5xl">Our Product Area</h2>
        <p>
          the majority have suffered alteration in some form, by injected
          humour, or randomised <br /> words which do not look even slightly
          believable.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <OurProductCard product={product} key={product._id}></OurProductCard>
        ))}
      </div>
    </div>
  );
};

export default OurProduct;
