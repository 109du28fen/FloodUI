import React from 'react';
import NavigationBar from './NavigationBar';
import ParameterControls from './ParameterControls';
import SimulationDisplay from './SimulationDisplay';
import ControlButtons from './ControlButtons';
import Catchpits from './Catchpits';

const App = () => {
    const handleParameterChange = (params) => {
        console.log('Parameters updated:', params);
    };

    const handleStart = () => {
        console.log('Simulation started');
    };

    const handlePause = () => {
        console.log('Simulation paused');
    };

    const handleReset = () => {
        console.log('Simulation reset');
    };

    return (
        <div style={styles.appContainer}>
            <NavigationBar />
            <div style={styles.mainContent}>
                <ParameterControls onParameterChange={handleParameterChange} />
                <SimulationDisplay />
                <ControlButtons onStart={handleStart} onPause={handlePause} onReset={handleReset} />
                <Catchpits/>
            </div>
        </div>
    );
};

const styles = {
    appContainer: {
        fontFamily: 'Arial, sans-serif',
    },
    mainContent: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
};

export default App;
