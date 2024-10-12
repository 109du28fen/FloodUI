import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Draggable from 'react-draggable';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ParameterControls = ({ onParameterChange }) => {
    const [rainfallTimeline, setRainfallTimeline] = useState([{ time: 0, rainfall: 50 }]);
    const [newTime, setNewTime] = useState(0);
    const [newRainfall, setNewRainfall] = useState(50);

    const handleTimelineChange = (index, field, value) => {
        const newTimeline = [...rainfallTimeline];
        newTimeline[index] = { ...newTimeline[index], [field]: parseInt(value, 10) };
        setRainfallTimeline(newTimeline);
        onParameterChange(newTimeline);
    };

    const addTimePoint = () => {
        const newPoint = { time: parseInt(newTime, 10), rainfall: parseInt(newRainfall, 10) };
        const updatedTimeline = [...rainfallTimeline, newPoint].sort((a, b) => a.time - b.time);
        setRainfallTimeline(updatedTimeline);
        setNewTime(0);
        setNewRainfall(50);
        onParameterChange(updatedTimeline);
    };

    const removeTimePoint = (index) => {
        const updatedTimeline = rainfallTimeline.filter((_, i) => i !== index);
        setRainfallTimeline(updatedTimeline);
        onParameterChange(updatedTimeline);
    };

    // Create chart data based on the rainfallTimeline
// Create chart data based on the rainfallTimeline
    const chartData = {
        labels: rainfallTimeline.map(point => point.time),
        datasets: [
            {
                label: 'Rainfall',
                data: rainfallTimeline.map(point => point.rainfall),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
                stepped: 'before', // This adds the step effect you want
                tension: 0, // Ensure there is no tension or curve between points
            },
        ],
    };


    // Create chart options
    const chartOptions = {
        scales: {
            x: { title: { display: true, text: 'Time (hours)' } },
            y: { title: { display: true, text: 'Rainfall (mm)' } },
        },
        responsive: true,
        maintainAspectRatio: false,
    };
    // Function to handle drag events for chart points
    const handleDrag = (e, ui, index) => {
        const updatedTimeline = [...rainfallTimeline];
        updatedTimeline[index].time = Math.max(0, updatedTimeline[index].time + ui.deltaX / 5); // Adjust scaling if needed
        updatedTimeline[index].rainfall = Math.max(0, updatedTimeline[index].rainfall - ui.deltaY / 5); // Adjust scaling if needed
        setRainfallTimeline(updatedTimeline);
        onParameterChange(updatedTimeline);
    };

    return (
        <div style={styles.container}>
            <h2>Adjust Model Parameters</h2>
            <div style={styles.timelineContainer}>
                {rainfallTimeline.map((point, index) => (
                    <div key={index} style={styles.timelineControl}>
                        <label>
                            Time:
                            <input
                                type="number"
                                value={point.time}
                                onChange={(e) => handleTimelineChange(index, 'time', e.target.value)}
                                style={styles.input}
                            />
                        </label>
                        <label>
                            Rainfall:
                            <input
                                type="number"
                                value={point.rainfall}
                                onChange={(e) => handleTimelineChange(index, 'rainfall', e.target.value)}
                                style={styles.input}
                            />
                        </label>
                        <button onClick={() => removeTimePoint(index)} style={styles.removeButton}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div style={styles.addControl}>
                <h3>Add New Time Point</h3>
                <label>
                    Time:
                    <input
                        type="number"
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                        style={styles.input}
                    />
                </label>
                <label>
                    Rainfall:
                    <input
                        type="number"
                        value={newRainfall}
                        onChange={(e) => setNewRainfall(e.target.value)}
                        style={styles.input}
                    />
                </label>
                <button onClick={addTimePoint} style={styles.addButton}>Add</button>
            </div>

            {/* Chart Section */}
            <div style={styles.chartContainer}>
                <Line data={chartData} options={chartOptions} />

                {/* Render draggable points */}
                {rainfallTimeline.map((point, index) => (
                    <Draggable
                        key={index}
                        position={{ x: point.time * 5, y: -point.rainfall * 5 }}
                        onDrag={(e, ui) => handleDrag(e, ui, index)}
                    >
                        <div style={styles.draggablePoint} />
                    </Draggable>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f4f4f4',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    timelineContainer: {
        marginBottom: '15px',
    },
    timelineControl: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    addControl: {
        marginTop: '20px',
    },
    input: {
        width: '60px',
        marginLeft: '5px',
        marginRight: '10px',
    },
    addButton: {
        padding: '5px 10px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    removeButton: {
        padding: '5px 10px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '10px',
    },
    chartContainer: {
        height: '400px',
        position: 'relative',
    },
    draggablePoint: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: '#007bff',
        position: 'absolute',
        cursor: 'pointer',
    },
};

export default ParameterControls;
