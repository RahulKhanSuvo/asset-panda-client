import Container from "../../Components/Container";
import tm from "../../assets/Banner/Get.svg";
const Team = () => {
  return (
    <section className="bg-[#F7F9FD] py-16">
      <Container>
        <div className="flex flex-col gap-16 md:gap-28 md:flex-row justify-between">
          <div className="md:w-1/2">
            <img src={tm} alt="" className="w-full" />
          </div>
          <div className="md:w-1/2 flex-col flex justify-center">
            <div className="max-w-[500px]">
              <h2 className="text-3xl font-bold">
                Get your entire team on the same page
              </h2>
              <p className="mt-4">
                From the boardroom to the stockroom, our software benefits your
                entire organization. With unlimited users, your executives can
                easily view reports, your managers can see asset history, and
                your front-line workers can manage assets on the move.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Team;
