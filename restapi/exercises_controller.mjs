import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.post('/exercises', asyncHandler(async (req, res) => {
    const exercise = req.body;

    if (!exercises.isExerciseValid(exercise)) {
        return res.status(400).json({ Error: "Invalid request" });
    }

    try {
        const newExercise = await exercises.createExercise(exercise);
        res.status(201).json(newExercise);
    } catch (error) {
        res.status(500).json({ Error: "Internal server error" });
    }
}));

app.get('/exercises', asyncHandler(async (req, res) => {
    const exercisesList = await exercises.getExercises();
    res.status(200).json(exercisesList);
}));

app.get('/exercises/:_id', asyncHandler(async (req, res) => {
    const exercise = await exercises.getExerciseById(req.params._id);
    if (exercise) {
        res.status(200).json(exercise);
    } else {
        res.status(404).json({ Error: "Not found" });
    }
}));

app.put('/exercises/:_id', asyncHandler(async (req, res) => {
    const exercise = req.body;

    if (!exercises.isExerciseValid(exercise)) {
        return res.status(400).json({ Error: "Invalid request" });
    }

    const updatedExercise = await exercises.updateExerciseById(req.params._id, exercise);
    if (updatedExercise) {
        res.status(200).json(updatedExercise);
    } else {
        res.status(404).json({ Error: "Not found" });
    }
}));

app.delete('/exercises/:_id', asyncHandler(async (req, res) => {
    const exercise = await exercises.deleteExerciseById(req.params._id);
    if (exercise) {
        res.status(204).send();
    } else {
        res.status(404).json({ Error: "Not found" });
    }
}));

app.listen(PORT, async () => {
    await exercises.connect();
    console.log(`Server listening on port ${PORT}...`);
});