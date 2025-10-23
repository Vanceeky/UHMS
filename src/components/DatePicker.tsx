"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerProps = {
  label?: string
  defaultDate?: Date
  onChange?: (date: Date | undefined) => void
}

function formatDate(date: Date | undefined) {
  if (!date) return ""
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function isValidDate(date: Date | undefined) {
  return !!date && !isNaN(date.getTime())
}

export function DatePicker({
  label = "Select Date",
  defaultDate = new Date(),
  onChange,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(defaultDate)
  const [month, setMonth] = React.useState<Date | undefined>(defaultDate)
  const [value, setValue] = React.useState(formatDate(defaultDate))

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    setValue(formatDate(selectedDate))
    setOpen(false)
    if (onChange) onChange(selectedDate)
  }

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        {label}
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder="MM/DD/YYYY"
          className="bg-background pr-10"
          onChange={(e) => {
            const inputDate = new Date(e.target.value)
            setValue(e.target.value)
            if (isValidDate(inputDate)) {
              setDate(inputDate)
              setMonth(inputDate)
              if (onChange) onChange(inputDate)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleDateSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
