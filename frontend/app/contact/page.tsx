import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
      <p className="text-lg text-gray-700 text-center mb-8">
        Have any questions or need assistance? Fill out the form below, and we’ll get back to you as soon as possible.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Your Name</label>
            <Input type="text" placeholder="Enter your name" className="w-full" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Your Email</label>
            <Input type="email" placeholder="Enter your email" className="w-full" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <Textarea placeholder="Write your message here..." className="w-full" rows="4" />
          </div>

          <Button type="submit" className="w-full">Send Message</Button>
        </form>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="text-gray-700">📍 Location: New Delhi, India</p>
        <p className="text-gray-700">📧 Email: support@yojanasarthi.com</p>
        <p className="text-gray-700">📞 Phone: +91 98765 43210</p>
      </div>
    </div>
  );
};

export default Contact;
