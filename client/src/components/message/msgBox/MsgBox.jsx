import React from "react";
import './style.css'
export default function MsgBox({ messages }) {

    return (
        <div className="msgBox" style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc' }}
        >
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {
                    messages.map((m, i) => (
                        <li key={i}>{m.from}: {m.message}</li>
                    ))
                }
            </ul>
        </div>
    );
}