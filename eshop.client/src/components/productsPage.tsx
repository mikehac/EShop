import { useAuth } from "../hooks/useAuth";

export function ProductsPage() {
  const { isAuthenticated, loading } = useAuth();
  return <p>Products Page</p>;
}
