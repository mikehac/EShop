import { useEffect, useState } from "react";
import { httpGet } from "../utils/service";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export function CheckoutPage() {
  interface CartItem {
    id: string;
    name: string;
    quantity: number;
  }

  const [details, setDetails] = useState<CartItem[]>([]);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      httpGet("cart", userId).then((res) => {
        console.log(res);
        setDetails(res);
      });
    }
  }, []);
  const columns: GridColDef[] = [
    { field: "name", headerName: "Product Name", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
  ];
  return (
    <section className="checkoutContainer">
      <div>
        <div className="checkoutBlock">
          <header>Shipping address</header>
        </div>
        <div className="checkoutBlock">
          <header>Payment Method</header>
        </div>
        <div className="checkoutBlock">
          <header>Items details</header>
          {details && details.length === 0 && (
            <div style={{ height: "300px" }}>
              <span>No items for current user</span>
            </div>
          )}
          {details && details.length > 0 && (
            <div>
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
            <div>10.00$</div>
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
            <div>10.15$</div>
          </div>
        </div>
        <div>
          <button className="payNowBtn">Pay Now</button>
        </div>
      </div>
    </section>
  );
}
