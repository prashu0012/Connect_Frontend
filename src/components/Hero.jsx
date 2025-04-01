import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full h-[500px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=background-blur-clean-531880.jpg&fm=jpg')",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-opacity-40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wider text-center mb-4">
            INSPIRED BY ANCIENT TEMPLES. HANDCRAFTED WITH DEVOTION.
          </h1>
          <p className="text-xl md:text-2xl tracking-wide">
            BRING HOME POSITIVITY
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
