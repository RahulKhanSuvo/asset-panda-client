const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="px-6 flex items-center gap-1 py-3 shadow-sm shadow-[#7367F0] bg-[#7367F0] hover:bg-[#685DD8] text-white rounded transition duration-300"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default ErrorPage;
