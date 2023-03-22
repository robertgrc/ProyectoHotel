import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import esES from 'date-fns/locale/es';
import { addHours } from 'date-fns';
import { Navbar } from '../../../components/Navbar/Navbar';
import { getMessagesES } from '../../../helpers/getMessages';
import CalendarEvent from '../../../components/CalendarEvent/CalendarEvent';
import CalendarModal from '../../../components/CalendarModal/CalendarModal';
import { useCalendarStore } from '../../../hooks/useCalendarStore';

const locales = {
    'es': esES,
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const events = [{
    title: 'Reserva',
    notes: 'Reserva habitaciones',
    start: new Date(),
    end: addHours( new Date(), 7),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Robert'
    }
  }];

const CalendarPage = () => {

// const { events } = useCalendarStore();  
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || ('week'));

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
        backgroundColor: '#347CF7',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white'
    };
    return {
        style
    };
  };

  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
    // openDateModal();
  };

  const onSelect = (event) => {
    console.log({ click: event });
    // setActiveEvent( event );
  };

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  };


  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
           event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
    </>
  );
};
export default CalendarPage;
