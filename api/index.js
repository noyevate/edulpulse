const express = require('express');
const app = express();
const port = process.env.PORT || 8500;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserRoute = require("../routes/user_routes");
const StudentRoute = require("../routes/student_routes");
const AttendanceRoute = require("../routes/attendance_route")
const BookRoute = require("../routes/book_route");
const TimetableRoute = require("../routes/timetabe_route");
const FeeDetails = require("../routes/fee_route");
const Holiday = require("../routes/holiday_route");
const Event = require("../routes/event_route");
const Behaviour = require("../routes/behaviour_route")

dotenv.config();

mongoose.connect(process.env.MONGOURL, {
    
}).then(() => {console.log("EduPulse database connected!")}).catch((err) => {console.log(err)})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => res.send("EduPulse"));

app.use('/', UserRoute);
app.use('/student', StudentRoute);
app.use('/attendance', AttendanceRoute);
app.use('/books', BookRoute);
app.use('/timetable', TimetableRoute);
app.use('/feeDetails', FeeDetails);
app.use('/holiday', Holiday);
app.use('/event', Event);
app.use('/behaviour', Behaviour);

app.listen(port, () => console.log(`NedMedPro backend services is running on port: ${port}`))

