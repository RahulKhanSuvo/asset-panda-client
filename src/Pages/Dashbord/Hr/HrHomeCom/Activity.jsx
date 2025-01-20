import {
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
  FaUndo,
} from "react-icons/fa";

const Activity = ({ activity }) => {
  const { totalRequests, totalApproved, totalRejected, totalReturned } =
    activity;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 bg-gray-100">
      {/* Total Requests */}
      <div className="border-b-2 p-4 hover:border-[#7367F0] border-[#e0defc] bg-white rounded-md shadow-md">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#E9E7FD] rounded-md">
            <FaClipboardList size={25} className="text-[#7367F0]" />
          </div>
          <p className="text-gray-800 font-medium text-xl">{totalRequests}</p>
        </div>
        <div className="mt-2">
          <h3 className="text-lg font-semibold">Total Requests</h3>
          <p className="text-gray-600 text-sm">
            Number of total asset requests made by employees.
          </p>
        </div>
      </div>

      {/* Approved Assets */}
      <div className="border-b-2 p-4 hover:border-[#28C76F] border-[#DFF7EA] bg-white rounded-md shadow-md">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#DFF7EA] rounded-md">
            <FaCheckCircle size={25} className="text-[#28C76F]" />
          </div>
          <p className="text-gray-800 font-medium text-xl">{totalApproved}</p>
        </div>
        <div className="mt-2">
          <h3 className="text-lg font-semibold">Assets Approved</h3>
          <p className="text-gray-600 text-sm">
            Assets that have been approved for employee use.
          </p>
        </div>
      </div>

      {/* Rejected Assets */}
      <div className="border-b-2 p-4 hover:border-[#FF4C51] border-[#FDE8E8] bg-white rounded-md shadow-md">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#FDE8E8] rounded-md">
            <FaTimesCircle size={25} className="text-[#FF4C51]" />
          </div>
          <p className="text-gray-800 font-medium text-xl">{totalRejected}</p>
        </div>
        <div className="mt-2">
          <h3 className="text-lg font-semibold">Assets Rejected</h3>
          <p className="text-gray-600 text-sm">
            Requests that were declined by the HR team.
          </p>
        </div>
      </div>

      {/* Returned Assets */}
      <div className="border-b-2 p-4 hover:border-[#FFC107] border-[#FFF3CD] bg-white rounded-md shadow-md">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#FFF3CD] rounded-md">
            <FaUndo size={25} className="text-[#FFC107]" />
          </div>
          <p className="text-gray-800 font-medium text-xl">{totalReturned}</p>
        </div>
        <div className="mt-2">
          <h3 className="text-lg font-semibold">Assets Returned</h3>
          <p className="text-gray-600 text-sm">
            Assets that employees have returned to the inventory.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Activity;
