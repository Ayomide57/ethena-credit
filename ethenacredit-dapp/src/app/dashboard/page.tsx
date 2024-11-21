"use client";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row gap-16 ml-16">
      <div className="flex flex-row p-6 gap-10 rounded-lg border-2 border-primary backdrop-blur-xl bg-sky-700/10">
        <div className="my-auto">
          <div className="text-lg text-primary">Loans</div>
          <div className="text-4xl text-purple-100">2k</div>
        </div>
        <div className="text-purple-300 my-auto bg-gradient-to-l from-purple-700 via-purple-800 to-purple-900 rounded-full p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
          </svg>
        </div>
      </div>
      <div className="flex flex-row  p-6 gap-10 rounded-lg border-2 border-primary backdrop-blur-xl bg-sky-700/10">
        <div className="my-auto">
          <div className="text-lg text-primary">Collateral</div>
          <div className="text-4xl text-purple-100">2k</div>
        </div>
        <div className="text-purple-300 my-auto bg-gradient-to-l from-purple-700 via-purple-800 to-purple-900 rounded-full p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
          </svg>
        </div>
      </div>
      <div className="flex flex-row p-6 gap-8 rounded-lg border-2 border-primary backdrop-blur-xl bg-sky-700/10">
        <div className="my-auto">
          <div className="text-lg text-primary">Downloads</div>
          <div className="text-4xl text-purple-100">2k</div>
        </div>
        <div className="text-purple-300 my-auto bg-gradient-to-l from-purple-700 via-purple-800 to-purple-900 rounded-full p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
