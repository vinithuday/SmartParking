import React, { createContext, useState, useContext } from "react";

const BookingDetailsContext = createContext();

export const usebookingDetails = () => useContext(BookingDetailsContext);

export const BookingDetailsProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [arrivalDateTime, setArrivalDateTime] = useState(new Date());
  const [departureTime, setDepartureTime] = useState(new Date());
  const [totalPrice, setTotalPrice] = useState("");

  const emailSetter = (email) => setEmail(email);
  const locationSetter = (location) => setLocation(location);
  const selectedSlotSetter = (selectedSlot) => setSelectedSlot(selectedSlot);
  const arrivalDateTimeSetter = (arrivalTime) =>
    setArrivalDateTime(arrivalTime);
  const departureTimeSetter = (departureTime) =>
    setDepartureTime(departureTime);
  const totalPriceSetter = (totalPrice) => setTotalPrice(totalPrice);

  return (
    <BookingDetailsContext.Provider
      value={{
        email,
        location,
        selectedSlot,
        arrivalDateTime,
        departureTime,
        totalPrice,
        emailSetter,
        locationSetter,
        selectedSlotSetter,
        arrivalDateTimeSetter,
        departureTimeSetter,
        totalPriceSetter,
      }}
    >
      {children}
    </BookingDetailsContext.Provider>
  );
};
