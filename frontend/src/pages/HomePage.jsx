import { Link } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseTable';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({setExerciseToEdit}) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const loadExercises = async () => {
        const response = await fetch("/exercises");
        const data = await response.json();
        setExercises(data);
    }

    useEffect( () => {
        loadExercises();
    }, []);

    const onDelete = async (_id) => {
        const response = await fetch(
            `/exercises/${_id}`, {method: "Delete"}
        );
        if(response.status === 204) {
            setExercises(exercises.filter(e => e._id !== _id))
        } else {
            alert(`Failed to delete exercise $(_id), status code = ${response.status}`)
        }
    }

    const onEdit = (exercise) => {
        setExerciseToEdit(exercise)
        navigate("/edit");
    };

    return (
        <>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseTable>
        </>
    );
}

export default HomePage;