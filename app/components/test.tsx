'use client'
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button"

const MeasurementConverter = () => {
  const [input1Value, setInput1Value] = useState('');
  const [input2Value, setInput2Value] = useState('');

  const swapInputs = () => {
    const temp = input1Value;
    setInput1Value(input2Value);
    setInput2Value(temp);
  };

  return (
    <div>
      <input
        type="text"
        value={input1Value}
        onChange={(e) => setInput1Value(e.target.value)}
        placeholder="Input Value 1"
      />
      <button onClick={swapInputs}>Swap</button>
      <input
        type="text"
        value={input2Value}
        onChange={(e) => setInput2Value(e.target.value)}
        placeholder="Input Value 2"
      />
    </div>
  );
};

export default MeasurementConverter;