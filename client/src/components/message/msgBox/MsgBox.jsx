import React from "react";
import './style.css'
import Avatar from '@mui/material/Avatar';


export default function MsgBox({ messages, user }) {

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
                height: "1.3rem",
                width: "1.3rem",
                fontSize: "0.7rem"
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <div className="msgBox" style={{ height: '480px', width: "100%", overflowY: 'auto', border: 'none', padding: "5px" }}
        >
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {
                    messages.map((m, i) => (

                        <li key={i} style={{ margin: "5px" }} >

                            {m?.from !== "you" &&

                                <div className="msgOwner">
                                    <Avatar {...stringAvatar(`${user?.firstname} ${user?.lastname}`)} />

                                    <span style={{ marginLeft: "5px" }} > <b> {user?.firstname} {user?.lastname}</b> </span>

                                    <span style={{ fontSize: "12px", marginLeft: "20px" }} >{m?.time}</span>
                                </div>
                            }

                            {m?.from == "you" &&

                                <div className="msgOwner">
                                    <Avatar {...stringAvatar(`${"you"} ${user?.lastname}`)} />
                                    <span style={{ marginLeft: "5px" }}><b>You</b></span>
                                    <span style={{ fontSize: "12px", marginLeft: "20px" }} >{m?.time}</span>

                                </div>
                            }

                            <div className="msgContent">
                                {m.message}

                            </div>
                            <hr />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}