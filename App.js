import React, { useState, useEffect } from "react";
// const stripePromise = loadStripe('sk_test_51Of6H3JdJTq4rwlvmBGPwi50oYx19HaSjU8bmDf6B9PZwIDF489MHOL9FMNMyfLs6bCDsKyoCa30RSCnFwBKeMoX00EFDOdXJs');
import InnerApp from "./InnerApp";
import { BookingDetailsProvider} from "./src/components/Context/bookingDetailsContext";

const App = () => {
return (

     <BookingDetailsProvider>
     <InnerApp/>
     </BookingDetailsProvider>
)
};

export default App;
