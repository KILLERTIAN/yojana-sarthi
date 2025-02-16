import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-6">About Yojana Sarthi</h1>
      <p className="text-lg text-gray-700 text-center mb-8">
        Yojana Sarthi is your AI-powered guide to discovering government schemes
        tailored to your needs. Our mission is to make government benefits more 
        accessible and understandable for everyone.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
          <p className="text-gray-600">
            We aim to bridge the gap between government initiatives and citizens 
            by leveraging AI to simplify the process of finding the right schemes.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
          <p className="text-gray-600">
            Yojana Sarthi analyzes your details and suggests the most relevant 
            government schemes based on eligibility and requirements.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose Yojana Sarthi?</h2>
        <ul className="list-disc text-lg text-gray-700 mx-auto max-w-2xl text-left">
          <li className="mb-2">AI-driven scheme recommendations</li>
          <li className="mb-2">Easy-to-use interface</li>
          <li className="mb-2">Real-time updates on schemes</li>
          <li className="mb-2">Simplified eligibility checking</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
