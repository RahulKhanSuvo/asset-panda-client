import Container from "../../Components/Container";
import mImg from "../../assets/Banner/round.svg";
const Mange = () => {
  return (
    <section className="bg-white">
      <Container>
        <div className="flex flex-col py-16 gap-16 md:flex-row">
          <div className="md:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold">
              Manage everything in one place using integrations
            </h2>
            <p className="my-8">
              Create a single source of truth for your entire asset estate by
              incorporating Asset Panda into your tech stack.
            </p>
            <p>
              Seamlessly sync data across your tech stack with one click and
              streamline workflows within the apps you use every day.
            </p>
          </div>
          <div className="md:w-1/2">
            <img src={mImg} alt="" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Mange;
