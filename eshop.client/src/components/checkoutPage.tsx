import { useEffect, useState } from "react";
import { httpGet } from "../utils/service";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { currencyFormat } from "../utils/formatter";
import { ProductCounter } from "./productCounter";

export function CheckoutPage() {
  interface CartItem {
    id: string;
    name: string;
    quantity: number;
    pricePerItem: number;
    totalPrice: number;
  }

  const [details, setDetails] = useState<CartItem[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  //TODO: For now this is hardcoded, will be changed soon!!!!
  const [shipping, setShipping] = useState<number>(0.15);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      httpGet("cart", userId).then((res) => {
        setDetails(res);
        calculateSubTotal(res);
      });
    }
  }, []);
  useEffect(() => {
    calculateSubTotal(details);
  }, [details]);

  useEffect(() => {
    setTotal(subTotal + shipping);
  }, [subTotal]);

  const calculateSubTotal = (items: CartItem[]) => {
    const subTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    setSubTotal(subTotal);
  };
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setDetails((prevDetails) =>
      prevDetails.map((item) => (item.id === id ? { ...item, quantity: newQuantity, totalPrice: item.pricePerItem * newQuantity } : item))
    );
  };

  const handleRemoveRow = (id: string) => {
    setDetails((prevDetails) => prevDetails.filter((item) => item.id !== id));
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Product Name", flex: 1 },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      renderCell: (params) => (
        <ProductCounter value={params.row.quantity} onQuantityChange={(newQuentity) => handleQuantityChange(params.row.id, newQuentity)} />
      ),
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      flex: 1,
      valueFormatter: (value) => {
        return currencyFormat(value);
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0,
      renderCell: (params) => (
        <button
          onClick={() => handleRemoveRow(params.row.id)}
          style={{
            backgroundColor: "#cdcdcd",
            color: "white",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          X
        </button>
      ),
    },
  ];
  return (
    <section className="checkoutContainer">
      <div className="checkoutBlock">
        <div>
          <header>Shipping address</header>
        </div>
        <div>
          <header>Payment Method</header>
        </div>
        <div>
          <header>Items details</header>
          {details && details.length === 0 && (
            <div style={{ height: "300px" }}>
              <span>No items for current user</span>
            </div>
          )}
          {details && details.length > 0 && (
            <div style={{ width: "100%" }}>
              <DataGrid rows={details} columns={columns} />
            </div>
          )}
        </div>
      </div>
      <div className="checkoutBlock">
        <header>Summary</header>
        <div className="summaryBlock">
          <div className="itemBlock">
            <div>
              <label>Subtotal</label>
            </div>
            <div>{currencyFormat(subTotal)}</div>
          </div>
          <div className="itemBlock">
            <div>
              <label>Promo codes</label>
            </div>
            <div>123</div>
          </div>
          <div className="itemBlock">
            <div>
              <label>Shipping fee</label>
            </div>
            <div>0.15$</div>
          </div>
          <hr />
          <div className="itemBlock">
            <div>
              <label>Total</label>
            </div>
            <div>{currencyFormat(total)}$</div>
          </div>
        </div>
        <div>
          <button className="payNowBtn">Pay Now</button>
        </div>
      </div>
    </section>
  );
}
