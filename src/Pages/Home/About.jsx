import Container from "../../Components/Container";
import aboutImage from "../../assets/Banner/MagnifyBarcode.png";

const About = () => {
  return (
    <div>
      <Container>
        <h3 className="text-center text-2xl font-bold mt-10">About Us</h3>
        <div className="flex flex-col md:flex-row items-center justify-center mt-8 space-y-6 md:space-y-0 md:space-x-10">
          <div className="flex-shrink-0">
            <img
              className="max-w-full h-auto rounded-md shadow-md"
              src={aboutImage}
              alt="Asset Management Illustration"
            />
          </div>
          <div className="max-w-lg text-justify">
            <p className="text-lg leading-relaxed">
              Welcome to <span className="font-semibold">AssetPanda </span>, a
              next-generation web application designed to help businesses
              streamline their asset tracking and management processes. Our
              platform empowers HR managers to easily monitor and manage company
              assets, ensuring that resources are utilized efficiently and
              responsibly.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              With a focus on simplicity and functionality, our system allows
              you to categorize assets into{" "}
              <span className="font-semibold">Returnable</span> items like
              laptops, phones, and office furniture, and{" "}
              <span className="font-semibold">Non-returnable</span>
              items like office supplies. This clear distinction helps
              businesses keep track of inventory and reduce waste.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              At XYZ, we are committed to providing a secure, scalable, and
              user-friendly solution for businesses of all sizes. Whether you're
              a small startup or a large enterprise, our platform adapts to your
              needs, helping you stay organized and efficient.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Join us on this journey to redefine asset management and take
              control of your resources like never before!
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
