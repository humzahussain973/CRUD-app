import { MdEdit, MdDelete } from 'react-icons/md';

const ExerciseRow = ({ exercise, onDelete, onEdit }) => {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>
                <button className="icon-button" onClick={() => onEdit(exercise)}>
                    <MdEdit />
                </button>
                <button className="icon-button" onClick={() => onDelete(exercise._id)}>
                    <MdDelete />
                </button>
            </td>
        </tr>
    );
};

export default ExerciseRow;