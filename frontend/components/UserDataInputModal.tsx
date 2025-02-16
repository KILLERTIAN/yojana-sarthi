"use client";
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";

export const UserDataInputModal = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    gender: "",
    state: "",
    income: "",
  });

  // Check localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem("userDetails");
    if (!storedData) {
      setOpen(true);
    }
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Save data & close modal
  const handleSubmit = () => {
    localStorage.setItem("userDetails", JSON.stringify(userData));
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <DialogTitle>User Information</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <label>Name</label>
            <Input name="name" value={userData.name} onChange={handleChange} placeholder="Enter your name" />
            <Button onClick={() => setStep(2)} disabled={!userData.name}>
              Next
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <label>Age</label>
            <Input name="age" type="number" value={userData.age} onChange={handleChange} placeholder="Enter your age" />
            <div className="flex justify-between">
              <Button onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)} disabled={!userData.age}>
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <label>Gender</label>
            <Select name="gender" value={userData.gender} onChange={handleChange}>
              <SelectItem value="">Select</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </Select>
            <div className="flex justify-between">
              <Button onClick={() => setStep(2)}>Back</Button>
              <Button onClick={() => setStep(4)} disabled={!userData.gender}>
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-4">
            <label>State</label>
            <Select name="state" value={userData.state} onChange={handleChange}>
              <SelectItem value="">Select</SelectItem>
              <SelectItem value="Puducherry">Puducherry</SelectItem>
              <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
              <SelectItem value="Delhi">Delhi</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </Select>
            <div className="flex justify-between">
              <Button onClick={() => setStep(3)}>Back</Button>
              <Button onClick={() => setStep(5)} disabled={!userData.state}>
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col gap-4">
            <label>Annual Income</label>
            <Input name="income" type="number" value={userData.income} onChange={handleChange} placeholder="Enter income in ₹" />
            <div className="flex justify-between">
              <Button onClick={() => setStep(4)}>Back</Button>
              <Button onClick={handleSubmit} disabled={!userData.income}>
                Submit
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
