import React from 'react';
import ReactDOM from 'react-dom/client'; // �޸Ĵ���
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root')); // ��������

root.render( // �޸Ĵ���
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
