"use client";


const Lender = () => {
  return (
    <>
      <div className="container">
        <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
          <div className="sm:flex sm:space-x-4">
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
              <div className="bg-white p-5">
                <div className="sm:flex sm:items-start">
                  <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                    <h3 className="text-sm leading-6 font-medium text-gray-400">
                      Total Users
                    </h3>
                    <p className="text-3xl font-bold text-black">71,897</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
              <div className="bg-white p-5">
                <div className="sm:flex sm:items-start">
                  <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                    <h3 className="text-sm leading-6 font-medium text-gray-400">
                      Total Investors
                    </h3>
                    <p className="text-3xl font-bold text-black">58</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
              <div className="bg-white p-5">
                <div className="sm:flex sm:items-start">
                  <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                    <h3 className="text-sm leading-6 font-medium text-gray-400">
                      Total Loan Issued
                    </h3>
                    <p className="text-3xl font-bold text-black">24</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
              <div className="bg-white p-5">
                <div className="sm:flex sm:items-start">
                  <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                    <h3 className="text-sm leading-6 font-medium text-gray-400">
                      Total Loan Requests
                    </h3>
                    <p className="text-3xl font-bold text-black">24</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lender;
