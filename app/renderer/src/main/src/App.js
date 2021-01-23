import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

// const {ipcRenderer} = window.require('electron');
import {ipcRenderer} from "electron";

function App() {

    const [remoteCode, setRemoteCode] = useState('');

    const [localCode, setLocalCode] = useState('');

    const [controlText, setControlText] = useState('');

    const login = async () => {
        /*渲染主进程请求*/
        let code = await ipcRenderer.invoke('login');

        setLocalCode(code);
    }

    const startControl = (remoteCode) => {
        ipcRenderer.send('control', remoteCode);
    }

    const handleControlState = (e, name, type) => {
        let text = '';

        if (type === 1) {
            text = `正在远程控制${name}`
        }else if (type === 2) {
            text = `被${name}控制`;
        }

        setControlText(text);
    }

    useEffect(() => {
        login();
        ipcRenderer.on('control-state-change', handleControlState)

        return () => {
            ipcRenderer.removeListener('control-state-change', handleControlState)
        }
    }, [])

    return (
        <div className="App">
            {
                controlText === '' ? <>
                    <div>你的控制码 {localCode}</div>

                    < input type="text" value={remoteCode} onChange={e => setRemoteCode(e.target.value)}/>
                    <button onClick={() => startControl(remoteCode)}>确认</button>

                </> : <div>{controlText}</div>
            }
        </div>
    );
}

export default App;
