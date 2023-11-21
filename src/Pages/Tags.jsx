// CertificateComponent.js

import React from 'react';

const tags = () => {
  return (
    <div className="border-pattern border border-black">
      <div className="content">
        <div className="inner-content border border-blue-500 bg-yellow-300 m-4 p-10 text-center">
          <h1 className="text-6xl uppercase">Certificate</h1>
          <h2 className="text-3xl border-b-2 border-red-700 inline-block pb-1">of Excellence</h2>
          <h3 className="text-2xl mt-10">This Certificate Is Proudly Presented To</h3>
          <p>Jane Doe</p>
          <h3 className="text-2xl mt-10">Has Completed</h3>
          <p>PrintCSS Basics Course</p>
          <h3 className="text-2xl mt-10">On</h3>
          <p>February 5, 2021</p>
          <div className="badge w-16 h-16 bg-no-repeat bg-cover absolute right-10 bottom-10"></div>
        </div>
      </div>
    </div>
  );
};

export default tags;
