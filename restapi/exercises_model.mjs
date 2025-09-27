import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';
const EXERCISE_COLLECTION = 'exercises';
const EXERCISE_CLASS = 'Exercise';

let connection = undefined;
let Exercise = undefined;

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING, { dbName: EXERCISE_DB_NAME });
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
        Exercise = createModel();
    } catch (err) {
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`);
    }
}

function createModel() {
    const exerciseSchema = new mongoose.Schema({
        name: { type: String, required: true },
        reps: { type: Number, required: true, min: 1 },
        weight: { type: Number, required: true, min: 1 },
        unit: { type: String, required: true, enum: ['kgs', 'lbs'] },
        date: { type: String, required: true, validate: [isDateValid, 'Invalid date format'] }
    }, { collection: EXERCISE_COLLECTION });

    return mongoose.model(EXERCISE_CLASS, exerciseSchema);
}

function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

function isExerciseValid(exercise) {
    // Check if all required properties exist
    if (!exercise.name || !exercise.reps || !exercise.weight || !exercise.unit || !exercise.date) {
        return false;
    }

    // Check if there are any extra properties
    const validProps = ['name', 'reps', 'weight', 'unit', 'date'];
    for (const prop in exercise) {
        if (!validProps.includes(prop)) {
            return false;
        }
    }

    // Validate individual properties
    if (typeof exercise.name !== 'string' || exercise.name.length < 1) {
        return false;
    }

    if (!Number.isInteger(exercise.reps) || exercise.reps <= 0) {
        return false;
    }

    if (!Number.isInteger(exercise.weight) || exercise.weight <= 0) {
        return false;
    }

    if (exercise.unit !== 'kgs' && exercise.unit !== 'lbs') {
        return false;
    }

    if (!isDateValid(exercise.date)) {
        return false;
    }

    return true;
}

async function createExercise(exerciseInfo) {
    const exercise = new Exercise(exerciseInfo);
    return await exercise.save();
}

async function getExercises() {
    return await Exercise.find({});
}

async function getExerciseById(id) {
    return await Exercise.findById(id);
}

async function updateExerciseById(id, updateInfo) {
    return await Exercise.findByIdAndUpdate(id, updateInfo, { new: true });
}

async function deleteExerciseById(id) {
    return await Exercise.findByIdAndDelete(id);
}

export { connect, isExerciseValid, createExercise, getExercises, getExerciseById, updateExerciseById, deleteExerciseById };