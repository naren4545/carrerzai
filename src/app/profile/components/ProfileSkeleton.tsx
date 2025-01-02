export default function ProfileSkeleton() {
    return (
      <div className="w-full max-w-[1100px] mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="flex  max-w-[800px] mx-auto items-center md:flex-row md:items-start gap-6">
          {/* Profile Image Skeleton */}
          <div className="w-[111px] h-[111px] rounded-full md:w-[300px] md:h-[300px] bg-gray-200 animate-pulse" />
          
          {/* Name and Basic Info */}
          <div className="space-y-4 text-center md:text-left flex-1 w-1/2">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mx-auto md:mx-0" />
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mx-auto md:mx-0" />
            <div className="flex flex-col md:flex-row gap-3 items-center md:items-start">
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse mx-auto md:mx-0" />
          </div>
        </div>
  
        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
          {/* Email */}
          <div className="space-y-2">
            <div className="h-5 w-16  bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-full max-w-xs bg-gray-200 rounded animate-pulse" />
          </div>
  
          {/* Contact Number */}
          <div className="space-y-2">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-full max-w-xs bg-gray-200 rounded animate-pulse" />
          </div>
  
          {/* Gender */}
          <div className="space-y-2">
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-full max-w-xs bg-gray-200 rounded animate-pulse" />
          </div>
  
          {/* Date of Birth */}
          <div className="space-y-2">
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-full max-w-xs bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    )
  }
  
  