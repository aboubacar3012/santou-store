import React from 'react';

type SpinnerOverlayProps = {
  show: boolean;
}

const SpinnerOverlay = ({ show }:SpinnerOverlayProps) => {
  return (
    <div
      id="spinner-overlay"
      className={`fixed inset-0 flex items-center justify-center z-50 ${show ? '' : 'hidden'}`}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
};

export default SpinnerOverlay;
