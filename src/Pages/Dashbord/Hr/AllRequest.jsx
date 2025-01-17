import Container from "../../../Components/Container";
import { FaSearch } from "react-icons/fa";
const AllRequest = () => {
  return (
    <Container>
      <div className="flex max-w-xl mx-auto mt-4 items-center border border-gray-300 rounded-md shadow-sm p-2">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 outline-none"
          // onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default AllRequest;
