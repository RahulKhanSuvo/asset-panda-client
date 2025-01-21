import Container from "../../Components/Container";
import p1 from "../../assets/Logo/paper-airplane.png";
import p2 from "../../assets/Logo/plane.png";
import p3 from "../../assets/Logo/shuttle-rocket.png";
const Packages = () => {
  const packages = [
    {
      title: "Starter",
      price: "$5",
      description: "Suitable for businesses with up to 5 employees.",
      maxEmployees: 5,
      logo: p1,
    },
    {
      title: "Growth",
      price: "$8",
      description: "Perfect for businesses with up to 10 employees.",
      maxEmployees: 10,
      logo: p2,
    },
    {
      title: "Enterprise",
      price: "$15",
      description: "Ideal for larger businesses with up to 20 employees.",
      maxEmployees: 20,
      logo: p3,
    },
  ];

  return (
    <section className="bg-white my-16 pt-8 rounded-t-[70px]">
      <Container>
        <div className="text-center mt-10 bg-white">
          <h2 className="text-2xl font-bold mb-6">Our Packages</h2>
          <p className="text-gray-600 mb-8">
            Choose a plan that fits your business needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="p-6 bg-[#F8F7FA] rounded-md shadow-md border hover:shadow-xl transition-shadow duration-300"
            >
              <img className=" mx-auto" src={pkg.logo} alt="" />
              <h3 className="text-lg mt-8 text-center font-semibold mb-4 text-black">
                {pkg.title}
              </h3>

              <div className="text-center">
                <p className=" font-bold text-[#B3B2B8] mb-2">
                  <span className="text-4xl font-bold text-[#7367F0]">
                    {pkg.price}
                  </span>{" "}
                  /year
                </p>
                <p className="text-sm text-gray-600">
                  Up to {pkg.maxEmployees} employees
                </p>
                <p className="text-gray-700 text-sm mb-6">{pkg.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Packages;
