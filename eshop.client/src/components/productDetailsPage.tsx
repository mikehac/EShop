import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpGet } from "../utils/service";
import { Product } from "../types/product";

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>(); // Extract the 'id' parameter from the URL
  console.log(id);
  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    httpGet("product", id).then((res) => {
      setProduct(res);
    });
  }, []);
  return (
    <>
      {product && (
        <section style={{ display: "flex", justifyContent: "flex-start" }}>
          <div>
            <img style={{ width: "300px" }} src={product.imageUrl} alt={product.name} />
          </div>
          <div>{product.name}</div>
          <div>{product.description}</div>
        </section>
      )}
    </>
  );
}
