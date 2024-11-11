"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

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

    const fetchJobs = async (currentPage: number) => {
        console.log(currentPage)
        setLoading(true);
        try {
            let url = "";
            const params = new URLSearchParams(window.location.search);
            params.delete('page');
            url = params.toString();

            const response = await fetch(`https://www.careerzai.com/v1/job/filtered?${url}&page=${currentPage}&limit=10`);
            const data = await response.json();
            setJobs(data.jobs);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const queryPage = searchParams.get('page');
        const currentPage = queryPage ? Number.parseInt(queryPage, 10) : 1;
        setPage(currentPage);
        fetchJobs(currentPage);
    }, [searchParams.get('location'), searchParams.get('skilltag'),searchParams.get('page')]);

    useEffect(() => {
        fetchJobs(page);
    }, [page, router]);

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
