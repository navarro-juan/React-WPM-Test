import React from 'react';

/**
 * TextInput Component
 * Handles user input and manages focus/disabled states with visual feedback.
 */
const TextInput = ({ inputText, handleInputChange, testActive, textDisplay }) => {
  const getHighlightedText = () => {
    const targetText = textDisplay.trim();
    const inputTextTrimmed = inputText.trim();
    let highlighted = '';

    for (let i = 0; i < inputTextTrimmed.length; i++) {
      const char = inputTextTrimmed[i];
      if (char === targetText[i]) {
        highlighted += `<span class="correct">${char}</span>`;
      } else {
        highlighted += `<span class="incorrect">${char}</span>`;
      }
    }

    return highlighted || targetText;
  };

  return (
    <div>
      <textarea
        className="text-input"
        placeholder="Start typing here..."
        value={inputText}
        onChange={handleInputChange}
        disabled={!testActive}
      />
      <div
        className="highlighted-text"
        dangerouslySetInnerHTML={{ __html: getHighlightedText() }}
      ></div>
    </div>
  );
};

export default TextInput;
