import React, { useState } from 'react';

const Sheet = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSheet = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div onClick={toggleSheet} className="cursor-pointer">
        {children[0]} {/* SheetTrigger */}
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-4">
            {children[1]} {/* SheetContent */}
          </div>
        </div>
      )}
    </div>
  );
};

export const SheetTrigger = ({ children }) => {
  return <div>{children}</div>;
};

export const SheetContent = ({ children }) => {
  return <div>{children}</div>;
};

export default Sheet;
