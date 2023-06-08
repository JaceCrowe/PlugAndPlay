import React, { useEffect, useState, useMemo } from "react";
const configuration = {
    maxNumb: 8,
    hover: true
    // hover: false
}


const Open1 = ({string, value, config}) => {
  const [inputText, setInputText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [hover, setHover] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [configHover, setConfigHover] = useState(false);
  const [max, setMax] = useState(8);

  useEffect(()=> {
    if(configuration.maxNumb){
      setMax(configuration.maxNumb)
    }
    configuration.hover === false ? setConfigHover(false) : setConfigHover(true)
  },[configuration])

  const handleHoverClick = () => {
    setHover(!hover);
  };

  const parseValue = () => {
    const parsedValue = parseInt(inputValue)
    if (parsedValue > 999999) {
      return `${Math.round((parsedValue / 1000000)*10)/10}m`;
    } else if (parsedValue > 999) {
      return `${Math.round((parsedValue / 1000)*10)/10}k`;
    }
    return inputValue;
  };
  const parseText = useMemo(() => {
    return inputText.slice(0, max);
  }, [inputText, max]);

  return (
    <div>
      <h1>Prompt</h1>
      <p>Create a component that takes in a word, number, and options object</p>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <br />
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <br />
      <button onClick={handleHoverClick}>
        Hover? {hover ? <span>On</span> : <span>Off</span>}
      </button>
      <div
        id="output"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <h2>Text: {parseText}</h2>
        <h2>Value: {parseValue()}</h2>
        {hover && isHover && configHover && (
          <h2>
            Text: {inputText} Value: {inputValue}
          </h2>
        )}
      </div>
    </div>
  );
};

export default Open1;