import { MoonLoader, PulseLoader, ScaleLoader } from "react-spinners";

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
      {smallHeight ? <PulseLoader></PulseLoader> : <ScaleLoader></ScaleLoader>}
    </div>
  );
};

export default LoadingSpinner;
