import React, { useState, useEffect, useRef } from 'react';
import TextDisplay from './TextDisplay';
import TextInput from './TextInput';
import Results from './Results';

/**
 * TypingTest Component
 * Handles the logic of starting, stopping, and updating the typing test.
 */
const TypingTest = () => {
  const [textDisplay, setTextDisplay] = useState('');
  const [inputText, setInputText] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [charactersTyped, setCharactersTyped] = useState(0);
  const [testActive, setTestActive] = useState(false);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [countdown, setCountdown] = useState(60); // 1 minute countdown
  const timerRef = useRef(null);
  const countdownRef = useRef(null);

  const paragraphs = [
    "In a quiet village nestled between towering mountains, a group of friends discovered an ancient map that promised untold treasures hidden deep within the forest. They decided to embark on an adventure, unaware of the mysteries and challenges that awaited them.",
    "As the sun dipped below the horizon, painting the sky in shades of orange and purple, the friends gathered around a campfire. They shared stories and laughter, their faces illuminated by the flickering flames, while the forest around them whispered secrets of old.",
    "The sound of leaves crunching underfoot was the only noise as they ventured deeper into the woods. Each step took them further from the familiar, and closer to the secrets the ancient map had hinted at. They moved cautiously, their hearts pounding with both fear and excitement.",
    "With every twist and turn of the path, the friends encountered strange symbols and markings carved into the trees. These cryptic signs seemed to guide them, and though they didn't fully understand their meaning, they followed them with growing anticipation.",
    "Suddenly, the forest opened up to reveal a hidden clearing bathed in moonlight. In the center stood a towering stone monument, covered in vines and ancient inscriptions. The friends exchanged awed glances, realizing they had stumbled upon something truly extraordinary.",
    "As they approached the monument, a soft breeze rustled through the trees, carrying with it a faint, melodic whisper. The sound seemed to beckon them closer, urging them to uncover the secrets hidden within the stone structure.",
    "They discovered a hidden compartment at the base of the monument, containing a collection of ancient scrolls and artifacts. The friends carefully unrolled the scrolls, revealing detailed illustrations and writings that depicted a long-lost civilization and their incredible achievements.",
    "Among the artifacts was a peculiar, intricately carved amulet. It seemed to radiate a faint, otherworldly glow, and the friends could sense that it held great significance. They decided to take it with them, hoping it would provide further clues on their journey.",
    "Their path led them to a series of underground tunnels, hidden beneath the forest floor. The air grew cooler as they descended, and the faint sound of dripping water echoed through the dark passageways. The friends pressed on, their determination unwavering.",
    "Finally, they emerged into a vast, hidden chamber filled with treasures beyond their wildest dreams. Gold, jewels, and ancient artifacts were piled high, glittering in the dim light. The friends stood in awe, realizing that they had uncovered a secret that had been buried for centuries."
  ];
  

  useEffect(() => {
    if (testActive) {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
      
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      clearInterval(countdownRef.current);
    }

    return () => {
      clearInterval(timerRef.current);
      clearInterval(countdownRef.current);
    };
  }, [testActive]);

  const startTest = () => {
    setTestActive(true);
    setInputText('');
    setTimeElapsed(0);
    setWpm(0);
    setAccuracy(0);
    setCharactersTyped(0);
    setTextDisplay(paragraphs[currentParagraphIndex]);
  };

  const stopTest = () => {
    setTestActive(false);
    alert(`Test stopped. Your final WPM was ${wpm}.`);
  };

  const calculateWpm = (text) => {
    const words = text.trim().split(/\s+/).length;
    const minutes = timeElapsed / 60;
    return Math.round(words / minutes);
  };

  const calculateAccuracy = (textDisplay, textInput) => {
    const correctChars = [...textInput].filter((char, i) => char === textDisplay[i]).length;
    const accuracy = (correctChars / textDisplay.length) * 100;
    return Math.round(accuracy);
  };

  const handleInputChange = (event) => {
    const text = event.target.value;
    setInputText(text);
    setCharactersTyped(text.length);
    setWpm(calculateWpm(text));
    setAccuracy(calculateAccuracy(textDisplay, text));
    if (text.trim() === textDisplay.trim()) {
      alert('You completed the paragraph!');
      setCurrentParagraphIndex((prevIndex) => (prevIndex + 1) % paragraphs.length);
      setTestActive(false);
    }
  };

  const progress = (charactersTyped / textDisplay.length) * 100;

  return (
    <div className="container">
      <h1 className="title">Juan's React Typing Test</h1>
      <TextDisplay textDisplay={textDisplay} />
      <TextInput
        inputText={inputText}
        handleInputChange={handleInputChange}
        testActive={testActive}
        textDisplay={textDisplay}
      />
      <div className="buttons">
        <button onClick={startTest} className="start-btn">Start Test</button>
        <button onClick={stopTest} className="stop-btn">Stop Test</button>
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <Results
        timeElapsed={timeElapsed}
        wpm={wpm}
        accuracy={accuracy}
        charactersTyped={charactersTyped}
        countdown={countdown}
      />
    </div>
  );
};

export default TypingTest;
