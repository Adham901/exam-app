"use client";

import * as React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export function PhoneInputField() {
  const [value, setValue] = React.useState<string | undefined>();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium ">Phone Number</label>
      <PhoneInput
        international
        defaultCountry="EG"
       
        value={value}
        onChange={setValue}
        className="w-full rounded-md border mt-1  bg-white px-3 py-2 text-sm shadow-sm 
                   focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}
