import Container from "../../Components/Container";

const Packages = () => {
  const packages = [
    {
      title: "Starter Package",
      price: "$5/month",
      description: "Suitable for businesses with up to 5 employees.",
      maxEmployees: 5,
    },
    {
      title: "Growth Package",
      price: "$8/month",
      description: "Perfect for businesses with up to 10 employees.",
      maxEmployees: 10,
    },
    {
      title: "Enterprise Package",
      price: "$15/month",
      description: "Ideal for larger businesses with up to 20 employees.",
      maxEmployees: 20,
    },
  ];

  return (
    <Container>
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold mb-6">Our Packages</h2>
        <p className="text-gray-600 mb-8">
          Choose a plan that fits your business needs.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-md border hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold mb-4 text-[#F80136]">
              {pkg.title}
            </h3>
            <p className="text-gray-700 text-sm mb-6">{pkg.description}</p>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800 mb-2">
                {pkg.price}
              </p>
              <p className="text-sm text-gray-600">
                Up to {pkg.maxEmployees} employees
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Packages;
