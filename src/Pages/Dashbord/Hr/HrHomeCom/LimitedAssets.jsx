import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const LimitedAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: limited = [], isLoading } = useQuery({
    queryKey: ["limited", user?.email],
    enabled: !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const { data } = await axiosSecure(`/hr/limitedStock/${user?.email}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full bg-white border shadow-md rounded-md overflow-auto">
        <div className="px-4 py-4 border-b">
          <p className="text-lg font-medium opacity-75">Limited Stock</p>
        </div>
        <div className="overflow-auto h-[415px]">
          <table className="table">
            <thead className="text-base uppercase">
              <tr>
                <th className="opacity-50">Assets</th>
                <th className="opacity-50">Type</th>
                <th className="text-center opacity-50">Quantity</th>
              </tr>
            </thead>
            <tbody className="text-base">
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  </td>
                  <td>
                    <div className="h-4 w-24 bg-gray-200 rounded capitalize"></div>
                  </td>
                  <td className="text-center">
                    <div className="h-4 w-8 bg-gray-200 rounded mx-auto"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full bg-white border shadow-md rounded-md overflow-auto">
        <div className="px-4 py-4 border-b">
          <p className="text-lg font-medium">Limited Stock</p>
        </div>
        <div className="overflow-auto h-[415px]">
          <table className="table">
            {/* head */}
            <thead className="text-base uppercase">
              <tr>
                <th>Assets</th>
                <th>Type</th>
                <th className="text-center">Quantity</th>
              </tr>
            </thead>
            <tbody className="text-base">
              {limited.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td className="capitalize">{item.productType}</td>
                  <td className="text-center">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LimitedAssets;
