// src/components/ProtectedComponent.js
import React from 'react';

const ProtectedComponent = () => {
  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Protected Component</h2>
      <p>This component requires authentication.</p>
    </div>
  );
};

export default ProtectedComponent;
