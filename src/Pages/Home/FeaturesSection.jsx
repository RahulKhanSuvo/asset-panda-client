import {
  MdOutlinePhoneAndroid,
  MdSyncAlt,
  MdLanguage,
  MdHistory,
  MdNotificationsActive,
  MdPeople,
  MdAttachFile,
  MdQrCodeScanner,
} from "react-icons/md";
import Container from "../../Components/Container";

const features = [
  {
    icon: <MdOutlinePhoneAndroid className="w-12 h-12 text-blue-500" />,
    title: "Manage assets from anywhere",
    description:
      "Access the mobile app on Android or iOS devices you already use every day.",
  },
  {
    icon: <MdSyncAlt className="w-12 h-12 text-green-500" />,
    title: "Support your workflows",
    description:
      "Enhance your workflows with custom actions for faster and easier asset updates.",
  },
  {
    icon: <MdLanguage className="w-12 h-12 text-purple-500" />,
    title: "Speak your organization’s language",
    description:
      "Create custom fields that put your data in your language, making onboarding easier.",
  },
  {
    icon: <MdHistory className="w-12 h-12 text-indigo-500" />,
    title: "Consolidate asset history",
    description:
      "Full audit trails provide enhanced accountability and forecasting for every asset.",
  },
  {
    icon: <MdNotificationsActive className="w-12 h-12 text-red-500" />,
    title: "Provide custom notifications",
    description:
      "Everyone stays informed automatically for improved efficiency and planning.",
  },
  {
    icon: <MdPeople className="w-12 h-12 text-yellow-500" />,
    title: "Enable role-based access",
    description:
      "Get enhanced data security and simple onboarding for every job function.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-[#F7F9FD] py-12">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            See what you can do with our asset platform
          </h2>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md"
            >
              {feature.icon}
              <h3 className="text-lg font-semibold text-gray-900 mt-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;
