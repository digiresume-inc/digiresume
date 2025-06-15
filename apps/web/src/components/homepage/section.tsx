import React from 'react';

const Section1 = () => {
  return (
    <div className="bg-background">
      <div className="h-auto lg:h-[85vh] max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 px-4 py-8 mt-5">
        <div className="w-full lg:w-1/2 items-center justify-center flex">
          <div className="border lg:border-2 rounded-2xl p-0 lg:p-1">
            <img
              src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="rounded-2xl"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center text-left p-4">
          <h1 className="text-2xl lg:text-3xl font-extrabold mb-4">
            Share your Startup story with everyone
          </h1>
          <p className="text-lg lg:text-xl text-foreground/80">
            Profile gives the viewers a brief description of yourself and your entrepreneurial
            journey which helps you connect with similar entrepreneurs and grow together
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section1;
