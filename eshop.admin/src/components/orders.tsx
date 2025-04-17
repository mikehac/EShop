import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { httpGet } from "../utils/service";

interface OrderItem {
  userId: string;
  userName: string;
  address: string;
  shipping: number;
  subtotal: number;
  total: number;
  totalItems: number;
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
      res.map((order: any) => {
        order.userName = order.user.username;
        order.address = `${order.address.street}, ${order.address.city}, ${order.address.zip}, ${order.address.country}`;
        order.totalItems = order.items.length;
      });
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
    {
      field: "id",
      headerName: "Order Id",
      width: 220,
    },
    {
      field: "userName",
      headerName: "Username",
      width: 200,
      renderCell: (params) => (
        <a href={`mailto:${params.value}`} style={{ textDecoration: "none", color: "blue" }}>
          {params.value}
        </a>
      ),
    },
    { field: "address", headerName: "Address", width: 150 },
    { field: "shipping", headerName: "Shipping", valueFormatter: dateTimeFormater },
    { field: "subtotal", headerName: "Sub Total", valueFormatter: dateTimeFormater },
    { field: "total", headerName: "Total", valueFormatter: dateTimeFormater },
    { field: "status", headerName: "Status" },
    { field: "totalItems", headerName: "Ordered products" },
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
