import { FiEdit, FiTrash2 } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";
const MyEmployeeColum = ({ teams, index, handleDelete }) => {
  const { memberEmail, memberId, memberImage, memberName, memberRole } = teams;
  return (
    <tr className="hover:bg-[#EDEDEF]">
      <th>{index + 1}</th>
      <td>
        <div>
          <img className="size-10" src={memberImage} alt="" />
        </div>
      </td>
      <td>{memberName}</td>
      <td className="">
        <IoMailOutline size={20} className=" text-[#F35449] inline" />{" "}
        <p className="inline">{memberEmail}</p>
      </td>
      <td>{memberRole}</td>
      <td className="">
        <button
          onClick={() => handleDelete(memberId)}
          className=" text-[#F05206]"
        >
          <FiTrash2 size={20} />
        </button>
      </td>
    </tr>
  );
};

export default MyEmployeeColum;
