"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";

interface FormInputProps {
  id: string;
  type: string;
  label: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, type, label }, ref) => (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Input id={id} type={type} className="col-span-3" ref={ref} />
    </div>
  )
);

FormInput.displayName = "FormInput";

export default FormInput;
