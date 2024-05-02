import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function CalendarPage() {

    // States
    const localizer = dayjsLocalizer(dayjs);
    const [calendarTrainings, setCalendarTrainings] = useState([]);

    // Fetch data 
    useEffect(() => {
        const fetchData = () => {
            fetch("https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings")
                .then(response => response.json())
                .then(data => {
                    setCalendarTrainings(data);
                })
                .catch(error => {
                    console.error(error);
                });
        };

        fetchData();
    }, []);


    // Array for events
    const events = calendarTrainings.map((item) => {
        const { id, date, duration, activity, customer } = item;

        try {
            const startDate = new Date(date);
            const endDate = dayjs(date).add(duration, 'm').toDate();

            const title = `${activity} / ${(customer?.firstname)} ${(customer?.lastname)}`;

            return {
                id: id,
                title: title,
                start: startDate,
                end: endDate,
            };
        } catch (error) {
            console.error(`Error ${id}:`, error);
            return null;
        }
    });


    // Calendar
    const CustomCalendar = () => (
        <div>
            <Calendar
                localizer={localizer}
                events={events.filter((event) => event !== null)}
                startAccessor="start"
                endAccessor="end"
                style={{
                    height: 800,
                    width: 1000,
                    margin: '10px',
                    backgroundColor: '#7da0d8',
                }}
                
            />
        </div>
    );

    return <CustomCalendar />;

}


