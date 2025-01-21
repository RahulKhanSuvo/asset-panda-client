import Container from "../../../Components/Container";

const UrFooter = () => {
  return (
    <div className="bg-[#7367F0] py-4">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center text-white px-4 md:px-0">
          {/* Brand Name */}
          <div className="text-lg font-semibold mb-2 md:mb-0">PandaAsset</div>

          {/* Links Section */}
          <div className="text-sm text-center md:text-left space-x-4">
            <a
              href="#license"
              className="hover:underline hover:text-gray-200 transition-colors"
            >
              License
            </a>
            <a
              href="#help"
              className="hover:underline hover:text-gray-200 transition-colors"
            >
              Help
            </a>
            <a
              href="#contact"
              className="hover:underline hover:text-gray-200 transition-colors"
            >
              Contact
            </a>
            <a
              href="#terms"
              className="hover:underline hover:text-gray-200 transition-colors"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UrFooter;
