import styles from "@/styles/Home.module.css";
import "@/styles/table.module.css";

import Link from "next/link";

const Lender = () => {
  return (
    <>
      <div className="container">
        <div className="flex justify-between">
          <div>
            {" "}
            <h1 className="p-4 text-3xl">Loans</h1>
          </div>
          <div className="p-8">
            {" "}
            <Link
              href="/lender/create-loan"
              className="p-3 text-1xl border border-slate-400 rounded-lg"
            >
              Create New Loan
            </Link>
          </div>
        </div>
        <div className={styles.content}>
          <div className="container mx-auto">
            <div className="p-4 ">
              <h1 className="">View all loans</h1>
              <div
                className="border border-slate-400 mb-40"
                style={{ overflowX: "scroll", width: "99%" }}
              >
                <table className="hover:table-fixed border-separate border-spacing-3 ">
                  <thead>
                    <tr>
                      <th>Loan ID</th>
                      <th>Borrower</th>
                      <th>Amount</th>
                      <th>Approve amount</th>
                      <th>Loan Amount Term</th>
                      <th>Credit History</th>
                      <th>Applicant Biz Income</th>
                      <th>Prop Accessment Per acre</th>
                      <th>Property Type</th>
                      <th>Property Area</th>
                      <th>Biz ID</th>
                      <th>Loan status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>1000000000</td>
                      <td>1000000000</td>
                      <td>1000000000</td>
                      <td>1</td>
                      <td>1000000000</td>
                      <td>1000000000</td>
                      <td>1000000000</td>
                      <td>1</td>
                      <td>1000000000</td>
                      <td>1000000000</td>
                      <td>Pending</td>
                      <td>View</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>1000000000</td>
                      <td>1000000000</td>
                      <td>1000000000</td>
                      <td>1</td>
                      <td>1000000000</td>
                      <td>1000000000</td>
                      <td>1000000000</td>
                      <td>1</td>
                      <td>1000000000</td>
                      <td>1000000000</td>
                      <td>Pending</td>
                      <td>View</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="max-w-[720px] mx-auto">
                <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      Projects with Invoices
                    </h3>
                    <p className="text-slate-500">
                      Overview of the current activities.
                    </p>
                  </div>
                  <div className="ml-3">
                    <div className="w-full max-w-sm min-w-[200px] relative">
                      <div className="relative">
                        <input
                          className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                          placeholder="Search for invoice..."
                        />
                        <button
                          className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="3"
                            stroke="currentColor"
                            className="w-8 h-8 text-slate-600"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                  <table className="w-full text-left table-auto min-w-max">
                    <thead>
                      <tr>
                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                          <p className="text-sm font-normal leading-none text-slate-500">
                            Invoice Number
                          </p>
                        </th>
                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                          <p className="text-sm font-normal leading-none text-slate-500">
                            Customer
                          </p>
                        </th>
                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                          <p className="text-sm font-normal leading-none text-slate-500">
                            Amount
                          </p>
                        </th>
                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                          <p className="text-sm font-normal leading-none text-slate-500">
                            Issued
                          </p>
                        </th>
                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                          <p className="text-sm font-normal leading-none text-slate-500">
                            Due Date
                          </p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-slate-50 border-b border-slate-200">
                        <td className="p-4 py-5">
                          <p className="block font-semibold text-sm text-slate-800">
                            PROJ1001
                          </p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-sm text-slate-500">John Doe</p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-sm text-slate-500">$1,200.00</p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-sm text-slate-500">2024-08-01</p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-sm text-slate-500">2024-08-15</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 border-b border-slate-200">
                        <td className="p-4 py-5">
                          <p className="block font-semibold text-sm text-slate-800">
                            PROJ1002
                          </p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-sm text-slate-500">Jane Smith</p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-sm text-slate-500">$850.00</p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-sm text-slate-500">2024-08-05</p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-sm text-slate-500">2024-08-20</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 border-b border-slate-200">
                        <td className="p-4 py-5">
                          <p className="block font-semibold text-sm text-slate-800">
                            PROJ1003
                          </p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-sm text-slate-500">Acme Corp</p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-sm text-slate-500">$2,500.00</p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-sm text-slate-500">2024-08-07</p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-sm text-slate-500">2024-08-21</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 border-b border-slate-200">
                        <td className="p-4 py-5">
                          <p className="block font-semibold text-sm text-slate-800">
                            PROJ1004
                          </p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-sm text-slate-500">Global Inc</p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-sm text-slate-500">$4,750.00</p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-sm text-slate-500">2024-08-10</p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-sm text-slate-500">2024-08-25</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex justify-between items-center px-4 py-3">
                    <div className="text-sm text-slate-500">
                      Showing <b>1-5</b> of 45
                    </div>
                    <div className="flex space-x-1">
                      <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                        Prev
                      </button>
                      <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
                        1
                      </button>
                      <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                        2
                      </button>
                      <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                        3
                      </button>
                      <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                        Next
                      </button>
                    </div>
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
