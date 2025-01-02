export default function ResumeBuilderSkeleton() {
    return (
      <div className="py-10 max-w-[1340px] mx-auto">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10 px-4">
          <div className="flex flex-col gap-8">
            {/* Profile Section */}
            <div className="bg-gray-100 rounded-lg py-7 shadow-md relative">
              <div className="flex justify-between items-center px-4">
                <div className="grid grid-cols-3 gap-8">
                  <div className="w-[175px] h-[175px] bg-gray-300 rounded-lg animate-pulse" />
                  <div className="ml-4 col-span-2">
                    <div className="h-10 w-3/4 bg-gray-300 mb-2 animate-pulse" />
                    <div className="h-6 w-1/2 bg-gray-300 mb-4 animate-pulse" />
                    <div className="py-4">
                      <div className="h-6 w-full bg-gray-300 mb-3 animate-pulse" />
                      <div className="h-6 w-full bg-gray-300 mb-3 animate-pulse" />
                      <div className="h-10 w-40 bg-gray-300 mt-4 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
              <hr className="border-gray-300 my-4" />
              <div className="mt-4 pt-4 px-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-start gap-3 pb-5">
                    <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />
                    <div className="flex-1">
                      <div className="h-4 w-1/4 bg-gray-300 mb-2 animate-pulse" />
                      <div className="h-4 w-3/4 bg-gray-300 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Achievements Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-8 w-1/3 bg-gray-300 animate-pulse" />
                <div className="h-8 w-20 bg-gray-300 animate-pulse" />
              </div>
              {[...Array(2)].map((_, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg p-4 mb-4 bg-gray-50">
                  <div className="h-4 w-3/4 bg-gray-300 animate-pulse" />
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
                    <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
  
            {/* Skills Section */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 w-1/4 bg-gray-300 animate-pulse" />
                <div className="h-8 w-20 bg-gray-300 animate-pulse" />
              </div>
              <div className="mt-4 flex flex-wrap gap-5">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="w-full">
                    <div className="h-6 w-1/3 bg-gray-300 mb-2 animate-pulse" />
                    <div className="flex flex-wrap gap-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-8 w-24 bg-gray-300 rounded animate-pulse" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          <div className="grid grid-cols-1 gap-8">
            {/* Education, Work Experience, Projects, Certifications, Social Links */}
            {[...Array(5)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-8 w-1/3 bg-gray-300 animate-pulse" />
                    <div className="h-8 w-20 bg-gray-300 animate-pulse" />
                  </div>
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-start justify-between bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-300 rounded animate-pulse" />
                        <div>
                          <div className="h-6 w-40 bg-gray-300 mb-2 animate-pulse" />
                          <div className="h-4 w-32 bg-gray-300 mb-2 animate-pulse" />
                          <div className="h-4 w-24 bg-gray-300 animate-pulse" />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
                        <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Bottom Buttons */}
        <div className="flex justify-center gap-4 pt-10">
          <div className="h-10 w-32 bg-gray-300 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-300 rounded animate-pulse" />
        </div>
  
        {/* Template Selection */}
        <div className="container mx-auto px-4 py-8 max-w-[600px]">
          <div className="h-10 w-3/4 bg-gray-300 mx-auto mb-8 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="relative cursor-pointer transition-all duration-200 hover:scale-105">
                <div className="w-full h-[277px] bg-gray-300 rounded-lg animate-pulse" />
                <div className="h-6 w-24 bg-gray-300 mx-auto mt-2 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  