'use client';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClientAvailabilityDatesCalendar() {
    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle>Your availability Days</CardTitle>
            </CardHeader>
            <CardContent>
                <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                />
            </CardContent>
        </Card>
    )
}