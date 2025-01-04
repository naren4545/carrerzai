import Cookies from "js-cookie";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
 const handleResume = async (formData: any,id:string) => {
    const pinqueryToken = Cookies.get("pinquery_token");
    try {
      const response = await fetch(
        `https://www.careerzai.com/v1/resume/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${pinqueryToken}`, // Include the Authorization token
          },
          body: JSON.stringify(formData), // Convert the data to a JSON string
        }
      );
  
      if (!response.ok) {
        throw new Error(`Failed to send data: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log("Data sent successfully:", result);
      return result;
    } catch (error: any) {
      console.error("Error sending data:", error.message);
    }
  };

  export default handleResume