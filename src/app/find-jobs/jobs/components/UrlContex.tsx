"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
// Define the shape of the context value
interface JobsContextType {
    jobs: any[]; // Replace `any` with a more specific type if possible
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
    loading: boolean;
}

// Create the context with an initial undefined value
const JobsContext = createContext<JobsContextType | undefined>(undefined);

// Provider component
export const JobsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [jobs, setJobs] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const searchParams = useSearchParams();


// useEffect(()=>{

//     const params = new URLSearchParams(window.location.search);
//     params.delete('page');
//     let dynamicQuery=params.toString()
//     console.log(dynamicQuery+"hii")
//     seturl(dynamicQuery)

// },[])

    const fetchJobs = async (currentPage: number) => {
        setLoading(true);
        try {

let url=""
            const params = new URLSearchParams(window.location.search);
                params.delete('page');
                url=params.toString()

            console.log(url)
            const response = await fetch(`https://www.careerzai.com/v1/job/filtered?${url}&page=${currentPage}&limit=10`);
            const data = await response.json();
            console.log(data.jobs,"texdt")
            setJobs(data.jobs );
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
        } finally {
            setLoading(false);
        }
    };
   
    useEffect(() => {
        const queryPage = new URLSearchParams(window.location.search).get('page');

      

        const currentPage = queryPage ? parseInt(queryPage, 10) : 1;
        setPage(currentPage);
        fetchJobs(currentPage);
        console.log(window.location.search +"nnn")
    }, [searchParams.get('location'),searchParams.get('skilltag')]);

    useEffect(() => {
        
        fetchJobs(page);
    }, [page,router]);

    return (
        <JobsContext.Provider value={{ jobs, page, totalPages, setPage, loading }}>
            {children}
        </JobsContext.Provider>
    );
};

// Custom hook to use the context
export const useJobsContext = (): JobsContextType => {
    const context = useContext(JobsContext);
    if (!context) {
        throw new Error('useJobsContext must be used within a JobsProvider');
    }
    return context;
};
