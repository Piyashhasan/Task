import { useState } from "react";

const AlphabetInterAction = () => {
  const [outputString, setOutputString] = useState([]);

  //   --- generate alphabet ---
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  //   --- replace by underScore functionality ---
  const replaceConsecutiveLetters = (str) => {
    return str.replace(/(.)\1{2,}/g, (match) =>
      "_".repeat(Math.ceil(match.length / 3))
    );
  };

  //   --- handle tile click ---
  const handleTileClick = (letter) => {
    const newString = outputString + letter;
    const updatedString = replaceConsecutiveLetters(newString);
    setOutputString(updatedString);
  };

  return (
    <div className="wrapper my-20">
      <h2 className="text-center text-[20px] font-semibold text-red-500">
        {" "}
        --- Alphabet Tile Interaction ---
      </h2>
      <div className="mt-5 flex flex-wrap items-center justify-start gap-3">
        {alphabet.map((letter) => (
          <button
            className="border w-[100px] h-[60px] font-semibold"
            key={letter}
            onClick={() => handleTileClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="mt-5 text-[20px] text-red-500 font-bold">
        Output: {outputString}
      </div>
    </div>
  );
};

export default AlphabetInterAction;
