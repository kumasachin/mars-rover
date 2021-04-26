import React from 'react';
import "./Terminal.css";

export const Terminal = ({printLogs}) => {
    const logs = printLogs ?
        printLogs.map((print, index) => {
            return (
                print.currentCoordinate ? <div className={index === 0 ? "one-robot-latest-log" :  "one-robot-log" }>
                    >{print.name}<br />
                    >{print.currentCoordinate}<br />
                    >{print.instruction}<br /><br /><br />
                    >{print.isLost && "Lost"}<br /><br /><br />
                </div> : <div className={index === 0 ? "one-map-latest-log" :  "one-map-log" }>
                    >
                </div>
            )
        }): null;
    return (
        <>
             <div class="consolebody">
                <p>></p>
                {logs}
            </div>
        </>
    );
};

export default Terminal;