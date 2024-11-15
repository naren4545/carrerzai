"use client"
import { useRouter } from 'next/navigation';
export default function PaginationButton({children, className,page,disabled}:{children:React.ReactNode,page:number, className?:string,disabled:boolean}) {

    const router = useRouter();


    const handlePageChange = (newPage: number) => {
		// setPage(newPage);

		const params = new URLSearchParams(window.location.search);

		// Set the new page parameter
		params.set("page", newPage.toString()); // This will add or update the page parameter

		// Construct the new URL with the existing parameters and the updated page parameter
		const newUrl = `${window.location.pathname}?${params.toString()}`;

		// Update the route with the new URL
	router.push(newUrl);
	window.location.href = newUrl;
		// Updates the URL without a full page reload
	};
  return (
    <button type='button' disabled={disabled} className={className} onClick={()=>handlePageChange(page)}>
        {children}
      
    </button>
  )
}
