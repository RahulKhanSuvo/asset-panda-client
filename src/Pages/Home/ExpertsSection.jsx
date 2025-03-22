import Container from "../../Components/Container";

const ExpertsSection = () => {
  return (
    <section className="bg-white">
      {" "}
      <Container>
        {" "}
        <div className="text-center py-12 px-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Get up and running quickly with our team of experts
          </h2>

          {/* Steps Container */}
          <div className="flex flex-col md:flex-row justify-between gap-12 mt-8">
            {steps.map((step, index) => (
              <div key={index} className="max-w-xs text-center">
                <h3 className="text-2xl font-bold text-gray-900">
                  {index + 1}
                </h3>
                <h4 className="text-lg font-semibold text-gray-800 mt-2">
                  {step.title}
                </h4>
                <p className="text-gray-600 mt-2">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Button */}
        </div>
      </Container>
    </section>
  );
};

// Steps Data
const steps = [
  {
    title: "See Asset Panda in action",
    description:
      "Demo Asset Panda with one of our product experts, then try the platform free for 14 days (no credit card required!).",
  },
  {
    title: "Onboard your team and your assets",
    description:
      "Our team of experts will get your program set up and provide comprehensive onboarding for your team on your timeline.",
  },
  {
    title: "Access technical support at any time",
    description:
      "Once your program is up and running, don’t worry – you're not alone! Access support via email 24/7 and get a response within 24 hours.",
  },
];

export default ExpertsSection;
