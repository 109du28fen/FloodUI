import React from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const SimulationDisplay = () => {
    const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
        loaderUrl: "/Simulation/Build/Simulation.loader.js", // ȷ��·���� public �е��ļ�ƥ��
        dataUrl: "/Simulation/Build/Simulation.data",
        frameworkUrl: "/Simulation/Build/Simulation.framework.js",
        codeUrl: "/Simulation/Build/Simulation.wasm",
    });

    return (
        <div style={styles.container}>
            <h2>Simulation Results</h2>

            {/* ��ʾ���ؽ��� */}
            {!isLoaded && (
                <div style={styles.loadingBar}>
                    <p>Loading... {Math.round(loadingProgression * 100)}%</p>
                </div>
            )}

            {/* Unity Canvas ���� */}
            <div style={styles.displayArea}>
                <Unity unityProvider={unityProvider} style={styles.unityCanvas} />
            </div>
        </div>
    );
};

// ��ʽ����
const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#e0e0e0',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        marginTop: '20px',
    },
    displayArea: {
        width: '960px', // ���� Unity �����Ŀ��
        height: '540px', // ���� Unity �����ĸ߶�
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        border: '2px dashed #ccc',
        margin: '0 auto',
    },
    unityCanvas: {
        width: '100%',
        height: '100%',
    },
    loadingBar: {
        margin: '20px 0',
        textAlign: 'center',
        color: '#333',
    },
};

export default SimulationDisplay;
