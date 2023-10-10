import { useEffect, useState } from "react";

const useTypewriter = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');
  
    useEffect(() => {

        if(!text) return;

        let index = 0;
        const intervalId = setInterval(() => {
            setDisplayedText((prev) => prev + text[index]);
            index++;
            if (index === text.length) clearInterval(intervalId);
        }, 100); // Adjust the interval speed as needed
  
      return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [text]);
  
    return <span>{displayedText}</span>;
  };
  
  export default useTypewriter;