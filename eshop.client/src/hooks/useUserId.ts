import { useEffect, useState } from "react";
import { getMe, httpGet } from "../utils/service";

export function useUserId() {
  const [userId, setUserId] = useState<string | null>(() => {
    // Initialize userId from localStorage if it exists
    return localStorage.getItem("userId");
  });

  useEffect(() => {
    const fetchUserId = async () => {
      if (!userId) {
        try {
          const response = await getMe();
          const data = await response.json();
          setUserId(data.id);
          localStorage.setItem("userId", data.id); // Save userId to localStorage
        } catch (error) {
          console.error("Error fetching user ID:", error);
        }
      }
    };

    fetchUserId();
  }, [userId]); // Only fetch if userId is not already set

  return userId; // Return the userId so it can be used in components
}
