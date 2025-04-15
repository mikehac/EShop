import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { httpGet } from "../utils/service";

interface OrderItem {
  userId: string;
  shipping: number;
  subtotal: number;
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
export function Orders() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await httpGet("order");
      if (res.status === 404) {
        setOrders([]);
        return;
      }

      setOrders(res);
    };

    fetchOrders();
  }, []);
  const columns: GridColDef[] = [
    { field: "shipping", headerName: "Shipping" },
    { field: "subtotal", headerName: "Sub Total" },
    { field: "total", headerName: "Total" },
    { field: "status", headerName: "Status" },
    { field: "createdAt", headerName: "Created at" },
    { field: "updatedAt", headerName: "Updated at" },
  ];
  return (
    <div>
      <h1>Orders</h1>
      <DataGrid rows={orders} columns={columns} />
    </div>
  );
}
