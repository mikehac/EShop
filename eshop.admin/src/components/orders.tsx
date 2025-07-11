import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import { MenuItem, Select, TextField } from "@mui/material";
import { httpGet, orderFilter } from "../utils/service";

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
  const [loading, setLoading] = useState(true);
  const statusValue = useRef("All"); // Initialize with "All"
  const freeText = useRef<HTMLInputElement | null>(null);
  const minTotal = useRef<HTMLInputElement | null>(null);
  const maxTotal = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await httpGet("order");
      if (res.status === 404) {
        setOrders([]);
        return;
      }
      setLoading(false);
      const ordersAndUser = getUserAndAddress(res);
      setOrders(ordersAndUser);
    };

    fetchOrders();
  }, []);

  const handleTextChange = () => {
    handleFiltering();
  };

  const handleStatusChange = (event: any) => {
    statusValue.current = event.target.value;
    handleFiltering();
  };

  const handleFiltering = () => {
    const filterDataToSend: orderFilter = {
      status: statusValue.current !== "All" ? statusValue.current : "",
    };

    if (freeText.current?.value && freeText.current.value !== "") {
      filterDataToSend.freeText = freeText.current.value;
    }

    if (minTotal.current?.value && minTotal.current.value !== "") {
      filterDataToSend.minTotal = Number(minTotal.current.value);
    }

    if (maxTotal.current?.value && maxTotal.current.value !== "") {
      filterDataToSend.maxTotal = Number(maxTotal.current.value);
    }

    console.log(filterDataToSend);
    httpGet("order/search", filterDataToSend).then((res) => {
      const ordersAndUser = getUserAndAddress(res);
      setOrders(ordersAndUser);
    });
  };

  const getUserAndAddress = (res: any[]) => {
    res.map((order: any) => {
      order.userName = order.user.username;
      order.address = `${order.address.street}, ${order.address.city}, ${order.address.zip}, ${order.address.country}`;
      order.totalItems = order.items.length;
    });
    return res;
  };
  const dateTimeFormater = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const dateFormatter = (value: any) => {
    const date = new Date(value);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Order Id", width: 220 },
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
  if (loading) return <div>Loading, Please wait, it could take few minutes because of render.com policy for free hosting</div>; // Prevents flickering

  return (
    <div>
      <h1>Orders</h1>
      <header>
        <section className="filterContainer">
          <TextField className="searchTxt" placeholder="Search..." inputRef={freeText} size="small" onChange={handleTextChange} />
          <TextField type="number" className="totalInput" placeholder="Min Total" inputRef={minTotal} size="small" onChange={handleTextChange} />
          <TextField type="number" className="totalInput" placeholder="Max Total" inputRef={maxTotal} size="small" onChange={handleTextChange} />
          <Select className="filterCombo" value={statusValue.current} onChange={handleStatusChange} size="small">
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
          </Select>
        </section>
      </header>
      <DataGrid rows={orders} columns={columns} />
    </div>
  );
}
