
import React, { useEffect, useState } from "react";

const Open2 = (props) => {
    const options= {
        US: 'Washington',
        Taiwan: 'Taipei',
        China: 'Beijing',
        Japan: 'Tokyo'
    }
    const [activeOptions, setActiveOptions] = useState([]);
    const [clicks,setClicks] = useState(0);
    const [showButton, setShowButton] = useState(false);
    const [answer, setAnswer] = useState('')
    const [lastClick,setLastClick] =useState('')

    const shuffledEntries = () => {
        let arr = [...Object.values(options),...Object.keys(options)];
        for (let i = arr.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[randomIndex]] = [
                arr[randomIndex],
                arr[i],
            ];
          }
        setActiveOptions(arr)
    }

    useEffect(()=> {
        shuffledEntries()
    }, [])

    const checkAnswer = (currentElement,e) => {
        const getKeyByValue = (obj, val) => {
            return Object.keys(obj).find(key => obj[key] === val);
        }
        if(clicks === 0){
            e.target.style.backgroundColor = 'blue'
            setClicks(1);
            setLastClick(currentElement)
            options[currentElement] ?  setAnswer(options[currentElement]) : setAnswer(getKeyByValue(options,currentElement));
        } else if (clicks ===1){
            if(currentElement === answer){
                let arr = activeOptions.filter(el => el !== currentElement);
                let arr2 = arr.filter(el => el !== lastClick);
                setActiveOptions(arr2);
            } else {
            e.target.style.backgroundColor = 'red'
            }
            setClicks(0);
        }
    }

    return(
        <div>
            <h1>Prompt</h1>
            <p>Create a game component for matching countries with their capitols</p>
            {activeOptions.map((currentElement,i)=> (
                <button 
                    key={i}
                    onClick={(e) => checkAnswer(currentElement,e)}
                    style={{
                        backgroundColor: `white`
                    }}
                >
                {currentElement}
                </button>
            ))}
        </div >
    )
}

export default Open2;