import { PencilIcon, CheckIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef, useState } from 'react'
import './EditText.css'

const EditText = ({values, onSave}) => {
    const[editing, setEditing] = useState(false)
    const [newValue, setNewValue] = useState(values);
    const inputClass = editing ? 'editInput editing' : 'editInput';


    const handleEditClick = () => {
        setEditing(true);
    };

    const handleInputChange = (event) => {
        setNewValue(event.target.value);
    };

    const handleSave = () => {
        onSave(newValue)
        setEditing(false)
    }

    useEffect(() => {
        if (editing) {
          document.getElementById("inputText").focus();
        }
      }, [editing]);

    return (
        <div className='ediText'>
            <input id="inputText" value={newValue} disabled={!editing} className={inputClass} onChange={handleInputChange}/> 
            {editing ? (
            <button onClick={handleSave} className='inputText'><CheckIcon className='h-6 w-6 text-black-500 pencil'/></button>
            ) : (
            <button id="editButton" onClick={handleEditClick}><PencilIcon className='h-6 w-6 text-black-500 pencil'/></button>
            )}
        </div>
        )

}

export default EditText