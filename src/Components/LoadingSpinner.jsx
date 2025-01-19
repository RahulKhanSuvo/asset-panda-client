import PropTypes from "prop-types";
import { MoonLoader, ScaleLoader } from "react-spinners";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "h-[100vh] bg-[#F5F4F7]"}
      flex
      fixed 
      inset-0
      flex-col 
      z-50
      justify-center 
      items-center `}
    >
      <MoonLoader size={50} color=" #7266EE" />
    </div>
  );
};

LoadingSpinner.propTypes = {
  smallHeight: PropTypes.bool,
};

export default LoadingSpinner;
