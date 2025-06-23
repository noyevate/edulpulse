const Student = require("../models/student")

async function createStudent(req, res) {
    try {
        const {
            userId,
            s_name,
            s_dob,
            s_gender,
            s_blood_group,
            s_father_name,
            s_mother_name,
            s_class,
            s_address,
            s_img,
            s_id
        } = req.body;

        if (!userId || !s_name || !s_dob) {
            return res.status(400).json({ message: 'Please include userId, student name, and date of birth.' });
        }

        const newStudent = await Student.create({
            userId,
            s_name,
            s_dob,
            s_gender,
            s_blood_group,
            s_father_name,
            s_mother_name,
            s_class,
            s_address,
            s_img,
            s_id
        });

        res.status(201).json(
            newStudent
        );

    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ message: 'Server error while creating student', error: error.message });
    }
    
}

async function getStudentByUserId(req, res) {
    try {
        const { userId } = req.params;

        const students = await Student.find({ userId: userId });

        if (!students || students.length === 0) {
            return res.status(404).json({ message: `No students found for userId: ${userId}` });
        }

        res.status(200).json(
            students
        );

    } catch (error) {
        console.error('Error fetching students by userId:', error);
    }
}

async function updateStudentById(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid student ID format.' });
        }

        const student = await Student.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true } // `new: true` returns the updated document, `runValidators: true` runs schema validators on update
        );

        if (!student) {
            return res.status(404).json({ message: 'Student not found for update.' });
        }

        res.status(200).json(
            student
        );

    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ message: 'Server error while updating student', error: error.message });
    }
}

async function deleteStudent(req, res) {
    try {
        const { id } = req.params;

        // Check if the ID is a valid Mongoose ObjectId (optional but good practice)
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid student ID format.' });
        }

        const student = await Student.findByIdAndDelete(id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found for deletion.' });
        }

        res.status(200).json({
            message: 'Student deleted successfully',
            deletedStudent: student
        });

    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ message: 'Server error while deleting student', error: error.message });
    }
}






module.exports = {createStudent, getStudentByUserId, updateStudentById, deleteStudent}