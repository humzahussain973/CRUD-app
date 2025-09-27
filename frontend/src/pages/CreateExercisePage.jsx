import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateExercisePage = () => {
    const [name, setName] = useState('');
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);
    const [unit, setUnit] = useState('kgs');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newExercise),
        });
        if (response.status === 201) {
            alert('Successfully added the exercise');
        } else {
            alert('Failed to add exercise');
        }
        navigate('/');
    };

    return (
        <div>
            <h2>Add Exercise</h2>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={(e) => setName(e.target.value)} />
            <input
                type="number"
                placeholder="Enter reps here"
                value={reps}
                onChange={(e) => setReps(e.target.valueAsNumber)} />
            <input
                type="number"
                placeholder="Enter weight here"
                value={weight}
                onChange={(e) => setWeight(e.target.valueAsNumber)} />
            <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}>
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>
            </select>
            <input
                type="text"
                placeholder="Enter date here (MM-DD-YY)"
                value={date}
                onChange={(e) => setDate(e.target.value)} />
            <button onClick={addExercise}>Add</button>
        </div>
    );
};

export default CreateExercisePage;