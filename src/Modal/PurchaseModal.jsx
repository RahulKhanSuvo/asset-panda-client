const PurchaseModal = ({ isOpen, setIsModalOpen, title, description }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        {/* Modal Title */}

        {/* Modal Actions */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
