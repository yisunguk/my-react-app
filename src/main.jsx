import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";

const MeetingRoomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [reservations, setReservations] = useState({});
  const [formData, setFormData] = useState({ name: "", time: "", location: "" });

  const days = eachDayOfInterval({
    start: startOfMonth(new Date(2025, 2)),
    end: endOfMonth(new Date(2025, 2)),
  });

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setFormData(reservations[date] || { name: "", time: "", location: "" });
  };

  const handleSubmit = () => {
    setReservations({ ...reservations, [selectedDate]: formData });
    setSelectedDate(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">2025년 3월 회의실 예약 달력</h2>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const formattedDate = format(day, "yyyy-MM-dd");
          return (
            <Card key={formattedDate} className="p-4 cursor-pointer" onClick={() => handleDateClick(formattedDate)}>
              <CardContent>{format(day, "d")}</CardContent>
            </Card>
          );
        })}
      </div>
      <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(null)}>
        <DialogContent>
          <DialogTitle>{selectedDate} 회의 예약</DialogTitle>
          <Input placeholder="예약자" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <Input placeholder="시간" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
          <Textarea placeholder="장소" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
          <Button onClick={handleSubmit}>예약 저장</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MeetingRoomCalendar;
