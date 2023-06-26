"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, label, className, ...props }, ref) => (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Input
        id={id}
        className={cn("col-span-3", className)}
        ref={ref}
        {...props}
      />
    </div>
  )
);

FormInput.displayName = "FormInput";

export default FormInput;
