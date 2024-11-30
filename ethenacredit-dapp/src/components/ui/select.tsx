/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"

import { cn } from "@/lib/utils"

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  lists: any
  }


const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, lists, ...props }, ref) => {
    return (
      <select
        className={cn(
          "mb-5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {lists.map((list: any) => (
          <option key={list.id} value={list.id}>
            {list.month}
          </option>
        ))}
      </select>
    );
  }
);
Select.displayName = "Select";

export { Select };
