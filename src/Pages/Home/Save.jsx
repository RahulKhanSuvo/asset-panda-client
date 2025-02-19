import Container from "../../Components/Container";
import ro from "../../assets/Banner/save.svg";
const Save = () => {
  return (
    <section className="bg-white py-16">
      <Container>
        <div className="flex flex-col gap-24 md:flex-row justify-between items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold">
              Save time while reducing costs
            </h2>
            <p className="mt-4">
              Manually tracking your enterprise-wide assets means losing out on
              valuable time and resources. But when you implement our
              easy-to-use asset management platform, you’ll improve efficiency
              across your organization, leading to time and cost savings.
            </p>
          </div>
          <div className="md:w-1/2">
            <img src={ro} alt="" className="w-full" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Save;
