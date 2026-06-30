import React from "react";

function ExperimentCard({
  title,
  image,
  description
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">
        <h3 className="text-2xl font-bold mb-3">
          {title}
        </h3>

        <p className="text-gray-600 mb-4">
          {description}
        </p>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Explore
        </button>
      </div>
    </div>
  );
}

export default ExperimentCard;