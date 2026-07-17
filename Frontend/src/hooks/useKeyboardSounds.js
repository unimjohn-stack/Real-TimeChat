const keyStrokeSounds = [
    new Audio("/Sounds/keystroke1.mp3"),
    new Audio("/Sounds/keystroke2.mp3"),
    new Audio("/Sounds/keystroke3.mp3"),
    new Audio("/Sounds/keystroke4.mp3"),
];

function useKeyBoardSounds() {
    const playRandomKeyStrokeSound = () => {
    const randomSound = keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];

    randomSound.currentTime = 0; 
    randomSound.play().catch((error) => console.log("Audio play failed:", error));
  };

  return { playRandomKeyStrokeSound };
}

export default useKeyBoardSounds;