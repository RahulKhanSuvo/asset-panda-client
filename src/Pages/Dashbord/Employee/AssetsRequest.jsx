import Container from "../../../Components/Container";

const AssetsRequest = () => {
  return (
    <Container>
      <div>
        <div>
          <select
            //   onChange={(e) => setFilterStatus(e.target.value)}
            id="stockStatus"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">Filter</option>

            <optgroup label="Stock Status">
              <option value="available">Available</option>
              <option value="out-of-stock">Out of Stock</option>
            </optgroup>

            <optgroup label="Asset Type">
              <option value="returnable">Returnable</option>
              <option value="non-returnable">Non-Returnable</option>
            </optgroup>
          </select>
        </div>
      </div>
    </Container>
  );
};
export default AssetsRequest;
