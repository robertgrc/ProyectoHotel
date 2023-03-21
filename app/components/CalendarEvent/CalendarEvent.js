import React from 'react';

const CalendarEvent = ({ event }) => {
  const { title, user } = event;
  return (
    <>
      <strong>{ title }</strong>
      <strong> - { user.name }</strong>
    </>
  );
};

export default CalendarEvent;
