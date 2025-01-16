import React from 'react';

/**
 * Results Component
 * Displays the results of the typing test.
 */
const Results = ({ timeElapsed, wpm, accuracy, charactersTyped, countdown }) => {
  return (
    <div className="results">
      <p>Time: {timeElapsed} seconds</p>
      <p>WPM: {wpm}</p>
      <p>Accuracy: {accuracy}%</p>
      <p>Total Characters: {charactersTyped}</p>
      <p>Countdown: {countdown}s</p>
    </div>
  );
};

export default Results;
