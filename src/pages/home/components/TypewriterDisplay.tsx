import React, { useEffect, useRef } from 'react';
import { TypewriterClass } from 'typewriter-effect';

const TypewriterDisplay = ({ text, arrayOfStrings }) => {
  const typewriterRef = useRef();

  useEffect(() => {
    if (typewriterRef.current) {
      const typewriter = new TypewriterClass(typewriterRef.current, {
        loop: true,
        delay: 50,
      });

      typewriter
        .typeString(`<div class="mb-5">${text}</div>`) // Wrap the text in a div
        .pauseFor(1000) // Pause after first string
        .deleteAll() // Delete the first string
        .callFunction(() => {
          typewriter.typeString('<h3>Related Questions</h3>').pauseFor(1000).deleteAll();
          // Display each string in the array one by one
          arrayOfStrings.forEach((str) => {
            typewriter.typeString(`<div class="mb-5">${str}</div>`).pauseFor(1000).deleteAll();
          });
        })
        .start();
    }
  }, [text, arrayOfStrings]);

  return <div ref={typewriterRef}></div>;
};

export default TypewriterDisplay;