import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();
  return (
    <DayPicker
      captionLayout="dropdown"
      classNames={{
        today: "text-background",
        selected: "bg-background text-foreground rounded-full",
        caption_label: `${defaultClassNames.caption_label} text-sm`,
        chevron: "text-foreground hover:bg-muted-foreground/20 rounded-lg",
        day_button: `${defaultClassNames.day_button} hover:bg-muted-foreground/20 rounded-full p-2`,
        dropdown: `${defaultClassNames.dropdown} text-sm`,
        dropdown_root: `${defaultClassNames.dropdown_root} hover:bg-muted-foreground/20 rounded-lg p-2`,
        disabled: "text-foreground-secondary",
        month_caption: `${defaultClassNames.month_caption} flex items-center justify-between`,
      }}
      disabled={{ after: new Date() }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
