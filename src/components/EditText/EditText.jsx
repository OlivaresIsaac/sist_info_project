import { PencilIcon, CheckIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef, useState } from 'react'
import './EditText.css'

const EditText = ({values, onSave, type}) => {
    const[editing, setEditing] = useState(false)
    const [newValue, setNewValue] = useState(values);
    const inputClass1 = editing ? 'editInput1 editing' : 'editInput1';
    const inputClass2 = editing ? 'editInput2 editing' : 'editInput2';

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


    if (type === 1){
        return (
            <div className='ediText'>
                <input id="inputText" value={newValue} disabled={!editing} className={inputClass1} onChange={handleInputChange}/> 
                {editing ? (
                <button onClick={handleSave} className='inputText'><CheckIcon className='h-6 w-6 text-black-500 pencil'/></button>
                ) : (
                <button id="editButton" onClick={handleEditClick}><PencilIcon className='h-6 w-6 text-black-500 pencil'/></button>
                )}
            </div>
        )}
    else if (type === 2){
        return (
            <div className='ediText'>
                <textarea id="inputText" value={newValue} disabled={!editing} className={inputClass2} onChange={handleInputChange}/> 
                {editing ? (
                <button onClick={handleSave} className='inputText'><CheckIcon className='h-6 w-6 text-black-500 pencil'/></button>
                ) : (
                <button id="editButton" onClick={handleEditClick}><PencilIcon className='h-6 w-6 text-black-500 pencil'/></button>
                )}
            </div>
        )}
    else if (type === 3){
        return (
            <div className='ediText'>
                <input id="inputText" value={newValue} disabled={!editing} className={inputClass1} onChange={handleInputChange} type="email"/> 
                {editing ? (
                <button onClick={handleSave} className='inputText'><CheckIcon className='h-6 w-6 text-black-500 pencil'/></button>
                ) : (
                <button id="editButton" onClick={handleEditClick}><PencilIcon className='h-6 w-6 text-black-500 pencil'/></button>
                )}
            </div>
        )}
}

export default EditText