import React from 'react';

function CertificateViewer({ certificateUrl , onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="relative">
        <img src={certificateUrl} alt="Certificate" className="w-96 h-60" />
        <button
        onClick={onClose}
         className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none">
          Close
        </button>
      </div>
    </div>
  </div>
  

  );
}

export default CertificateViewer;
