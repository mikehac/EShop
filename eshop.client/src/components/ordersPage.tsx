import { Modal } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { httpGet } from "../utils/service";

function formatCurrency(value: number) {
  return `${Number(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}$`;
}

const mainColumns = (renderDetailsButton: (params: any) => void): GridColDef[] => [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "createdAt",
    headerName: "Order's date",
    width: 150,
    valueFormatter: (value: string) => {
      const date = new Date(value);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
  { field: "productAmount", headerName: "Products in order", width: 150, renderCell: (params) => params.row.items.length },
  { field: "status", headerName: "Status", width: 150 },
  {
    field: "subtotal",
    headerName: "Subtotal",
    type: "number",
    width: 150,
    valueFormatter: formatCurrency,
  },
  { field: "shipping", headerName: "Shipping", width: 150 },
  {
    field: "total",
    headerName: "Total Price",
    type: "number",
    width: 150,
    valueFormatter: formatCurrency,
  },
  {
    field: "details",
    headerName: "Details",
    width: 150,
    renderCell: (params) => (
      <button className="details-button" onClick={() => renderDetailsButton(params)}>
        Details
      </button>
    ),
  },
];

const orderDetailsColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 250 },
  { field: "quantity", headerName: "Quantity", width: 100 },
  {
    field: "totalPrice",
    headerName: "Total Price",
    type: "number",
    width: 150,
    valueFormatter: formatCurrency,
  },
];
export function OrdersPage() {
  const userId = localStorage.getItem("userId");
  const [orders, setOrders] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // State to control modal visibility
  const [orderDetails, setOrderDetails] = useState([]); // State to hold order details
  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return; // Ensure userId is available
      const res = await httpGet(`order/user`, userId, undefined, true);
      if (res.statusCode === 404) {
        setOrders([]);
        return;
      }
      setOrders(res);
    };

    fetchOrders();
  }, []);

  function renderDetailsButton(params: any) {
    setIsOpen(true);
    console.log(params.row);
    httpGet(
      "product/list",
      params.row.items.map((item: any) => item.productId),
      undefined
    ).then((res) => {
      const orderDetailsWithProducts = params.row.items.map((item: any) => {
        const product = res.find((p: any) => p.id === Number(item.productId));
        return {
          id: item.productId,
          name: product.name,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
        };
      });
      setOrderDetails(orderDetailsWithProducts);
    });
  }
  return (
    <>
      <p>My orders</p>
      <div>
        <DataGrid columns={mainColumns(renderDetailsButton)} rows={orders} />
        <Modal open={isOpen} onClose={() => {}}>
          <div className="modal-content">
            <div className="modal-header">
              <header>Order Details</header>
              {/* Order details content goes here */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setOrderDetails([]);
                }}
              >
                X
              </button>
            </div>
            <DataGrid columns={orderDetailsColumns} rows={orderDetails} />
          </div>
        </Modal>
      </div>
    </>
  );
}
