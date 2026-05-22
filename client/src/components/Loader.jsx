import React from 'react';

const Loader = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-zinc-400/40'>
      <div className="spinner">
        <div className="spinner1" />
      </div>
    </div>
  );
}

export default Loader;
