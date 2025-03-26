import { useEffect, useState } from "react";
import { httpGet, httpPut } from "../utils/service";
import { useUserId } from "../hooks/useUserId";
import { Address } from "../types/address";

export function UserDetailsPage() {
  const userId = useUserId();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [address, setAddress] = useState<Address>({
    street: "",
    city: "",
    zip: "",
    country: "",
  });

  useEffect(() => {
    if (userId) {
      httpGet("user", userId).then((res) => {
        setUserDetails(res);
        if (res.address) {
          setAddress(res.address); // Assuming the user has one address
        }
      });
    }
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await httpPut(`user/${userId}`, address);
      alert("Address updated successfully!");
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update address.");
    }
  };

  return (
    <div className="mainUserDetails">
      <h1>User Details Page</h1>
      {userDetails && (
        <div>
          <p>User name: {userDetails.username}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h3>Edit Address</h3>
        <div>
          <label htmlFor="street">Street:</label>
          <input type="text" id="street" name="street" value={address.street} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" value={address.city} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="zip">Zip Code:</label>
          <input type="text" id="zip" name="zip" value={address.zip} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input type="text" id="country" name="country" value={address.country} onChange={handleInputChange} />
        </div>
        <section>
          <button className="submit" type="submit">
            Update Address
          </button>
        </section>
      </form>
    </div>
  );
}
