'use client'

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import JobList from '../../jobs/components/JobsSection';
import HeroSection from '../../jobs/components/HeroSection';

const fetchData = async (searchParamsString: string) => {
  try {
    const pinqueryToken = document.cookie.split('; ').find(row => row.startsWith('pinquery_token='))?.split('=')[1];
    const endpoint = "https://www.careerzai.com/v1/profile/jobs/bookmarks";

    const response = await fetch(
      `${endpoint}?${searchParamsString}`,
      {
        headers: {
          'Content-Type': 'application/json',
          ...(pinqueryToken && { Authorization: `Bearer ${pinqueryToken}` }),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in fetchData:', error);
    throw error;
  }
};

export default function Wrapper() {
  const [jobData, setJobData] = useState<{ jobs: any[]; currentPage: number; totalPages: number }>({ 
    jobs: [], 
    currentPage: 1, 
    totalPages: 1 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const searchParamsString = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.has('page')) params.set('page', '1');
    if (!params.has('limit')) params.set('limit', '10');
    return params.toString();
  }, [searchParams]);

  const fetchJobData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchData(searchParamsString);
      setJobData(data);
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [searchParamsString]);

  useEffect(() => {
    fetchJobData();
  }, [fetchJobData]);

  if (error) {
    return (
      <div className="p-4 text-red-600">
        <p>Error fetching jobs data: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <HeroSection />
      <JobList 
        jobs={jobData.jobs} 
        page={jobData.currentPage} 
        totalPages={jobData.totalPages} 
        loading={loading} 
      />
    </div>
  );
}

