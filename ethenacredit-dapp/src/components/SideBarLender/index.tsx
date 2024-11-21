import Link from "next/link";
//import { GiFamilyHouse } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaBuildingUser } from "react-icons/fa6";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SideBarLender = ({ }: any) => {
    return (
      <div className="flex flex-col items-center w-40 h-full overflow-hidden text-white backdrop-blur-xl bg-sky-700/10">
        <Link className="flex items-center w-full px-3 mt-3" href="#">
          <svg
            className="w-8 h-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
          </svg>
          <span className="ml-2 text-sm font-bold">The App</span>
        </Link>
        <div className="w-full px-2">
          <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
              href="#"
            >
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="ml-2 text-sm font-medium">Dasboard</span>
            </Link>
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
              href="/lender/loans"
            >
              <RiMoneyDollarCircleLine className="w-6 h-6" />
              <span className="ml-2 text-sm font-medium">Loans</span>
            </Link>
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded"
              href="/lender/loans/loan-requests"
            >
              <GiTakeMyMoney className="w-8 h-8" />
              <span className="ml-2 text-sm font-medium">Loan Requests</span>
            </Link>
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
              href="/lender/users"
            >
              <FaBuildingUser className="w-6 h-6" />
              <span className="ml-2 text-sm font-medium">Users</span>
            </Link>
          </div>
          <div className="flex flex-col items-center w-full mt-2 border-t border-gray-300">
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
              href="#"
            >
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              <span className="ml-2 text-sm font-medium">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default SideBarLender;
