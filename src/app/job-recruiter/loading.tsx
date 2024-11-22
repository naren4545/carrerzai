// ./app/loading.tsx
export default function Loading() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {/* Spinner */}
        <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"/>
        {/* Loading Message */}
        <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
      </div>
    );
  }
  