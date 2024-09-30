import React, { useState, useEffect } from 'react';

function Timer() {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // Time in seconds (25 minutes)
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    // Function to handle Start/Pause
    const handleStartPause = () => {
        setIsRunning(prevIsRunning => !prevIsRunning); // Toggle isRunning
    };

    
    // Update the timer every second
    useEffect(() => {
        let interval = null; // Variable to hold the interval ID

        if (isRunning && timeLeft > 0) {
            // Start the interval when isRunning is true
            interval = setInterval(() => {
                setTimeLeft(prevTimeLeft => prevTimeLeft - 1); // Decrease timeLeft by 1
            }, 1000); // Update every second
        } else if (!isRunning && interval) {
            clearInterval(interval); // Clear the interval when paused
        } else if (timeLeft === 0) {
            setIsBreak(prevIsBreak => !prevIsBreak); // Switch to break
            setTimeLeft(prevIsBreak ? 25 * 60 : 5 * 60); // Set to 25 or 5 minutes
        }

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [isRunning, timeLeft]); // Dependencies


    return (
        <>
            <header>
                <h1>Pomodoro Timer</h1>
            </header>
            <main>
            <div class="tomato">
            <div class="leaf"></div>
            <div class="leaf num2"></div>
            <h2>{isBreak ? "Break Time" : "Focus Time"}</h2>
            <h1>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</h1>
            <button onClick={handleStartPause}>
                {isRunning ? 'Pause' : 'Start'}
            </button>
            </div>
            </main>
        </>
    );
}

export default Timer;
