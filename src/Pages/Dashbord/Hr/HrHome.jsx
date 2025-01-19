import Container from "../../../Components/Container";
import HrTopRequested from "./HrHomeCom/HrTopRequested";
import PendingRequests from "./HrHomeCom/PendingRequests";

const HrHome = () => {
  return (
    <Container>
      <div className="flex gap-6">
        <PendingRequests></PendingRequests>
        <HrTopRequested></HrTopRequested>
      </div>
    </Container>
  );
};

export default HrHome;
