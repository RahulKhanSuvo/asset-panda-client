import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Container from "../../../Components/Container";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { format } from "date-fns";
import useUserStatus from "../../../Hooks/useUserStatus";
import PrintableAsset from "../../../Components/PrintableAsset";
import { PDFDownloadLink } from "@react-pdf/renderer";
import showToast from "../../../Components/ShowToast";
const MyAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { userDetails } = useUserStatus();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  console.log(userDetails);
  const { data: assets = [], refetch } = useQuery({
    queryKey: ["myAssets", user?.email, searchQuery, statusFilter],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/employee/assetsList/${user?.email}`,
        {
          params: {
            search: searchQuery,
            filter: statusFilter,
          },
        }
      );
      return data;
    },
  });
  const handelCancel = async (id) => {};
  console.log(assets);
  const handelReturn = async (asset) => {
    try {
      await axiosSecure.patch(`/employee/returnAsset/${asset._id}`, {
        assetId: asset.assetId,
      });
      showToast("Asset Returned Successfully");
      refetch();
    } catch (error) {
      console.log(error);
      showToast(`${error.message}`, "error");
    }
  };
  return (
    <Container>
      <div className="p-4">
        {/* Search Section */}
        <div className="flex max-w-xl mx-auto items-center border border-gray-300 rounded-md shadow-sm p-2 mb-4">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by name..."
            className="flex-1 outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Section */}
        <div>
          <div>
            <select
              onChange={(e) => setStatusFilter(e.target.value)}
              id="stockStatus"
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">Filter</option>
              <optgroup label="Stock Status">
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
              </optgroup>
              <optgroup label="Asset Type">
                <option value="returnable">Returnable</option>
                <option value="non-returnable">Non-Returnable</option>
              </optgroup>
            </select>
          </div>
        </div>

        {/* Display Filtered Items */}
        <div className="overflow-x-auto">
          {assets.length > 0 ? (
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-200 p-2">Name</th>
                  <th className="border border-gray-200 p-2">Type</th>
                  <th className="border border-gray-200 p-2">Request Date</th>
                  <th className="border border-gray-200 p-2">Approval Date</th>
                  <th className="border border-gray-200 p-2">Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset, index) => (
                  <tr key={index}>
                    <td className="border border-gray-200 p-2">
                      {asset.assetName}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {asset.assetType}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {format(new Date(asset.requestDate), "dd/MM/yyyy")}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {asset?.approvalDate &&
                        format(new Date(asset.approvalDate), "dd/MM/yyyy")}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {asset.status}
                    </td>
                    <td className="border border-gray-200 p-2">
                      <button
                        disabled={
                          asset.status === "approved" ||
                          asset.status === "rejected"
                        }
                        onClick={() => handelCancel(asset._id)}
                        className="btn btn-sm"
                      >
                        Cancel
                      </button>
                      {(asset.status === "approved" &&
                        asset.assetType === "returnable") ||
                      asset.status === "returned" ? (
                        <>
                          <button
                            disabled={asset.status === "returned"}
                            onClick={() => handelReturn(asset)}
                            className="btn btn-sm"
                          >
                            Return
                          </button>
                        </>
                      ) : null}
                      {asset.status === "approved" && (
                        <PDFDownloadLink
                          document={
                            <PrintableAsset
                              asset={asset}
                              companyInfo={userDetails}
                            />
                          }
                          fileName={`${asset.assetName}_Details.pdf`}
                        >
                          {({ loading }) =>
                            loading ? (
                              "Loading..."
                            ) : (
                              <button className="btn btn-sm">Print</button>
                            )
                          }
                        </PDFDownloadLink>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500">No assets found.</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default MyAssets;
