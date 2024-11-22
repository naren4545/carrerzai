"use client";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const WishlistButton = ({ id, Wishlist }: { id: string; Wishlist: boolean }) => {
  const [isWishlisted, setIsWishlisted] = useState(Wishlist); // Initialize with the prop value
  const pinqueryToken = Cookies.get("pinquery_token");
console.log(id)
  const handleWishlistToggle = async () => {
    try {
      if (isWishlisted) {
        await deleteJob(); // Call DELETE if currently wishlisted
      } else {
        await postJob(); // Call POST if not wishlisted
      }
      setIsWishlisted(!isWishlisted); // Toggle state
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const postJob = async () => {
    try {
      const response = await axios.post(
        `https://www.careerzai.com/v1/profile/bookmark/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${pinqueryToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`API Error: ${error.response?.data || error.message}`);
      }
      throw error;
    }
  };

  const deleteJob = async () => {
    try {
      const response = await axios.delete(
        `https://www.careerzai.com/v1/profile/bookmark/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${pinqueryToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`API Error: ${error.response?.data || error.message}`);
      }
      throw error;
    }
  };

  return (
    <button
      type="button"
      onClick={handleWishlistToggle}
      className={`relative w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-300 ${
        isWishlisted ? "bg-red-100 border-red-500" : "bg-gray-100 border-gray-300"
      }`}
    >
      {/* Wishlist SVG Icon */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill={isWishlisted ? "black" : "none"} // Fill color changes on toggle
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300"
      >
        <title>Heart Icon</title>
        <path
          d="M10 10.3333C10 8.46667 10 7.53333 10.3633 6.82C10.6829 6.19282 11.1928 5.68291 11.82 5.36333C12.5333 5 13.4667 5 15.3333 5H24.6667C26.5333 5 27.4667 5 28.18 5.36333C28.8072 5.68291 29.3171 6.19282 29.6367 6.82C30 7.53333 30 8.46667 30 10.3333V32.5083C30 33.3183 30 33.7233 29.8317 33.945C29.7589 34.0414 29.6661 34.1208 29.5596 34.1778C29.4531 34.2348 29.3356 34.268 29.215 34.275C28.9367 34.2917 28.6 34.0667 27.9267 33.6183L20 28.3333L12.0733 33.6167C11.4 34.0667 11.0633 34.2917 10.7833 34.275C10.6631 34.2677 10.5458 34.2345 10.4396 34.1775C10.3334 34.1205 10.2409 34.0412 10.1683 33.945C10 33.7233 10 33.3183 10 32.5083V10.3333Z"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default WishlistButton;
