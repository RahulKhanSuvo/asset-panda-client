import Container from "../../../Components/Container";
import HrPie from "./HrHomeCom/HrPie";
import HrTopRequested from "./HrHomeCom/HrTopRequested";
import LimitedAssets from "./HrHomeCom/LimitedAssets";
import PendingRequests from "./HrHomeCom/PendingRequests";

const HrHome = () => {
  return (
    <Container>
      <div className=" grid grid-cols-1   lg:grid-cols-3 mt-8 justify-between gap-6">
        <PendingRequests></PendingRequests>
        <HrTopRequested></HrTopRequested>
        <LimitedAssets></LimitedAssets>
      </div>
      <HrPie></HrPie>
    </Container>
  );
};

export default HrHome;
