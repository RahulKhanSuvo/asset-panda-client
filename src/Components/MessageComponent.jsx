const MessageComponent = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-75px)] bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-700">
          You are not affiliated with any company.
        </h1>
        <p className="mt-4 text-gray-600">
          Please contact your HR department for assistance.
        </p>
      </div>
    </div>
  );
};

export default MessageComponent;
