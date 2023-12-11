import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "../reducer/PatientReducer";
import dentistReducer from "../reducer/DentistReducer";
import appointmentReducer from "../reducer/AppointmentReducer";
import adminReducer from "../reducer/AdminReducer";
import serviceReducer from "../reducer/ServiceReducer";
import paymentReducer from "../reducer/PaymentReducer";
import announcementReducer from "../reducer/AnnouncementReducer";
import notificationReducer from "../reducer/NotificationReducer";
import messageReducer from "../reducer/MessageReducer";
import feeReducer from "../reducer/AppointmentFeeReducer";
import scheduleReducer from "../reducer/ScheduleReducer";
import insuranceReducer from "../reducer/InsuranceReducer";
import thunk from "redux-thunk";

const store = configureStore({
    reducer:{
        patient: patientReducer,
        dentist: dentistReducer,
        appointment: appointmentReducer,
        admin: adminReducer,
        service: serviceReducer,
        payment: paymentReducer,
        announcement:announcementReducer,
        notification: notificationReducer,
        messages:messageReducer,
        fee:feeReducer,
        schedule: scheduleReducer,
        insurance: insuranceReducer,
    },
    middleware:[thunk]
});

export default store;