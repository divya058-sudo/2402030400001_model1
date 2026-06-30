import React from "react";

const Certificate = ({ studentName, experiment }) => {
  return (
    <div className="border-8 border-yellow-500 p-10 bg-white shadow-2xl rounded-xl max-w-4xl mx-auto text-center">

      <h1 className="text-5xl font-bold text-blue-700">
        Certificate
      </h1>

      <p className="mt-6 text-xl">
        This Certificate is Proudly Presented To
      </p>

      <h2 className="text-4xl font-bold mt-4 text-green-600">
        {studentName}
      </h2>

      <p className="mt-6 text-lg">
        For Successfully Completing
      </p>

      <h3 className="text-3xl font-semibold mt-2">
        {experiment}
      </h3>

      <p className="mt-8">
        Interactive Science Experiment Lab
      </p>

      <p className="mt-4">
        Date: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default Certificate;