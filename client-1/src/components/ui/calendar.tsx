import * as React from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { cn } from "@/lib/utils";
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();
  return (
    <DayPicker
      captionLayout="dropdown"
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        caption_label: "hidden",
        button_next: `${defaultClassNames.button_next} w-10 h-10 hover:bg-muted-foreground/20 rounded-lg`,
        button_previous: `${defaultClassNames.button_previous} w-10 h-10 hover:bg-muted-foreground/20 rounded-lg`,
        chevron: "text-foreground",
        day: `text-center`,
        day_button: `hover:bg-muted-foreground/20 rounded-lg w-10 h-10`,
        disabled: "text-foreground-secondary",
        dropdown: `text-sm bg-transparent hover:bg-transparent`,
        dropdown_root: `${defaultClassNames.dropdown_root} hover:bg-muted-foreground/20 rounded-lg p-2 h-10`,
        dropdowns: `${defaultClassNames.dropdowns} flex items-center justify-center space-x-2 z-50`,
        month: `${defaultClassNames.month} !m-0`,
        month_caption: `${defaultClassNames.month_caption} flex items-center justify-center`,
        month_grid: `${defaultClassNames.month_grid} w-full`,
        nav: `${defaultClassNames.nav} flex w-full items-center justify-between`,
        root: `${defaultClassNames.root} bg-foreground text-background rounded-lg`,
        weekdays: `${defaultClassNames.weekdays}`,
        weeks: `${defaultClassNames.weeks}`,
        today: "text-background",
        selected: "bg-background text-foreground rounded-lg",
        outside: "text-foreground-secondary",
        ...classNames,
      }}
      disabled={{ after: new Date() }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
