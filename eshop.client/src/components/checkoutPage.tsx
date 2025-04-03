import { useEffect, useState } from "react";
import { httpGet, httpPost } from "../utils/service";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { currencyFormat } from "../utils/formatter";
import { ProductCounter } from "./productCounter";
import { useUserId } from "../hooks/useUserId";
import { Address } from "../types/address";

export function CheckoutPage() {
  interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
  }

  const [cartDetails, setCartDetails] = useState<CartItem[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0.15); // Hardcoded for now
  const [total, setTotal] = useState<number>(0);
  const [address, setAddress] = useState<Address>({
    street: "",
    city: "",
    zip: "",
    country: "",
  });
  const userId = useUserId();

  useEffect(() => {
    const fetchCartDetails = async () => {
      if (userId) {
        const res = await httpGet("cart", userId);
        setCartDetails(res);
      }
    };

    const fetchAddress = async () => {
      if (userId) {
        const res = await httpGet(`user/${userId}`);
        if (res?.address) {
          setAddress(res.address);
        }
      }
    };

    fetchCartDetails();
    fetchAddress();
  }, [userId]);

  useEffect(() => {
    const calculateSubTotal = (items: CartItem[]) => {
      return items.reduce((sum, item) => sum + item.totalPrice, 0);
    };

    const newSubTotal = calculateSubTotal(cartDetails);
    setSubTotal(newSubTotal);
    setTotal(newSubTotal + shipping);
  }, [cartDetails, shipping]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartDetails((prevDetails) =>
      prevDetails.map((item) => (item.id === id ? { ...item, quantity: newQuantity, totalPrice: item.price * newQuantity } : item))
    );
  };

  const handleRemoveRow = (id: string) => {
    setCartDetails((prevDetails) => prevDetails.filter((item) => item.id !== id));
  };

  const purchaseHandler = (total: number, subtotal: number, shipping: number, address: Address, cartDetails: CartItem[]) => {
    const messageToSend = {
      userId,
      address,
      items: cartDetails,
      shipping,
      subTotal: subtotal,
      total,
    };
    httpPost("mqmanager/sendPurchuse", messageToSend).then((res) => console.log(res));
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Product Name", flex: 1 },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      renderCell: (params) => (
        <ProductCounter value={params.row.quantity} onQuantityChange={(newQuantity) => handleQuantityChange(params.row.id, newQuantity)} />
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
          <div className="shippingBlock">
            <div>
              <label>Street:</label>
              <span>{address.street}</span>
            </div>
            <div>
              <label>City:</label>
              <span>{address.city}</span>
            </div>
            <div>
              <label>Zip Code:</label>
              <span>{address.zip}</span>
            </div>
            <div>
              <label>Country:</label>
              <span>{address.country}</span>
            </div>
          </div>
        </div>
        <div>
          <header>Payment Method</header>
        </div>
        <div>
          <header>Items details</header>
          {cartDetails && cartDetails.length === 0 && (
            <div style={{ height: "300px" }}>
              <span>No items for current user</span>
            </div>
          )}
          {cartDetails && cartDetails.length > 0 && (
            <div style={{ width: "100%" }}>
              <DataGrid rows={cartDetails} columns={columns} />
            </div>
          )}
        </div>
      </div>
      <div className="checkoutBlock">
        <div>
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
              <div>{currencyFormat(shipping)}</div>
            </div>
            <hr />
            <div className="itemBlock">
              <div>
                <label>Total</label>
              </div>
              <div>{currencyFormat(total)}</div>
            </div>
          </div>
        </div>
        <div>
          <button onClick={() => purchaseHandler(total, subTotal, shipping, address, cartDetails)} className="payNowBtn">
            Pay Now
          </button>
        </div>
      </div>
    </section>
  );
}
