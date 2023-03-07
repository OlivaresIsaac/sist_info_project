import {FaStar} from "react-icons/fa";
import React from "react";
import "./FeedbackPage.css"
const colors={
    orange:"#FFBASA",
    gray:"#a9a9a9"
}
export function FeedbackPage() {

    const stars=Array(5).fill(0);
    const [currentValue, setCurrentValue]=React.useState(0);
    const [hoverValue,setHoverValue]=React.useState(undefined);

    const handleClick=value=>{
        setCurrentValue(value)
    };

    const handleMouseOver=value =>{
        setHoverValue(value)
    };

    const handleMouseLeave=()=>{
        setHoverValue(undefined)
    };

    return (
        <div className='container'>
            <h2>Soy Feedback</h2>
            <div className='stars'>
                {stars.map((_, index) => {
                    return(
                        <FaStar
                            key={index}
                            size={24}
                            style={{
                                marginRight: 10,
                                cursor: "pointer"
                            }}
                            color={(hoverValue || currentValue)>index ? colors.orange : colors.grey}
                            onClick={() => handleClick(index + 1)}
                            onMouseOver={()=> handleMouseOver(index+1)}
                            onMouseLeave={handleMouseLeave}
                        />
                    )
                })}
            </div>
            <textarea className='textarea'
                placeholder="Whats your feedback"
                //style={styles.textarea}
            />
            <button className='button'>Submit</button>
        </div>
    );
};