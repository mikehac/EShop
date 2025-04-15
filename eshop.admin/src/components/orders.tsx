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
  const dateTimeFormater = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const dateFormatter = (value: any) => {
    return new Date(value).toLocaleDateString("en-GB", {
      year: "numeric",
      day: "numeric",
      month: "numeric",
    });
  };

  const columns: GridColDef[] = [
    { field: "userId", headerName: "User ID" },
    { field: "shipping", headerName: "Shipping", valueFormatter: dateTimeFormater },
    { field: "subtotal", headerName: "Sub Total", valueFormatter: dateTimeFormater },
    { field: "total", headerName: "Total", valueFormatter: dateTimeFormater },
    { field: "status", headerName: "Status" },
    { field: "createdAt", headerName: "Created at", valueFormatter: dateFormatter },
    { field: "updatedAt", headerName: "Updated at", valueFormatter: dateFormatter },
  ];
  return (
    <div>
      <h1>Orders</h1>
      <DataGrid rows={orders} columns={columns} />
    </div>
  );
}
