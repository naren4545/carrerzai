"use client";
import  { useState } from "react";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";
interface StatusDropdownProps {
  initialStatus: string; // The initial status value, e.g., "In Review"
  itemId: number; // The ID of the item to update the status for
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ initialStatus, itemId }) => {
  const [status, setStatus] = useState<string>(initialStatus);
  const [loading, setLoading] = useState<boolean>(false);
    const  {toast} =useToast()
  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);

    try {
      const pintudeToken = Cookies.get("pintude_token");
      // Make an API call to update the status
      const response = await fetch(`https://www.careerzai.com/v1/application/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${pintudeToken}`
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const data: { status: string } = await response.json(); // Assuming the API returns the updated status
        setStatus(data.status);
        toast({
          variant: "default",
          title: `Status Updated to ${data.status}`,
          description: `Successfully updated status to ${data.status}`,
         
        });
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      

      toast({
        variant: "destructive",
        title: "Failed to update status",
        description: "Please try again",
       
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <label htmlFor="status" className="block text-2xl font-medium text-[#FF6700]">
        
      </label>
      <select
        id="status"
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={loading}
        className="mt-1 block w-full pl-3 pr-4 text-2xl py-2 bg-transparent  border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  rounded-md"
      >
        <option value="Not Selected">Not Selected</option>
        <option value="In Review">In Review</option>
        <option value="Shortlisted">Shortlisted</option>
        <option value="pending">Pending</option>
      </select>
      {loading && <p className="text-sm text-[#FF6700]">Updating...</p>}
    </div>
  );
};

export default StatusDropdown;
