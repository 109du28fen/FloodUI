import React from 'react';

const SimulationDisplay = () => {
    return (
        <div style={styles.container}>
            <h2>Simulation Results</h2>

            {/* 使用 iframe 嵌入 127.0.0.1:8080 的内容 */}
            <div style={styles.displayArea}>
                <iframe
                    src="http://127.0.0.1:8080"
                    style={styles.iframe}
                    title="127.0.0.1 Content"
                />
            </div>
        </div>
    );
};

// 样式定义
const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#e0e0e0',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        marginTop: '20px',
    },
    displayArea: {
        width: '960px', // 设置 iframe 容器的宽度
        height: '540px', // 设置 iframe 容器的高度
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        border: '2px dashed #ccc',
        margin: '0 auto',
    },
    iframe: {
        width: '100%',
        height: '100%',
        border: 'none', // 移除 iframe 的默认边框
    },
};

export default SimulationDisplay;
