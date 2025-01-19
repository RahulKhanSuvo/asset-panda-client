import Container from "../../../Components/Container";
import HrTopRequested from "./HrHomeCom/HrTopRequested";
import PendingRequests from "./HrHomeCom/PendingRequests";

const HrHome = () => {
  return (
    <Container>
      <PendingRequests></PendingRequests>
      <HrTopRequested></HrTopRequested>
    </Container>
  );
};

export default HrHome;
