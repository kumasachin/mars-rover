import React from 'react';
import "./Terminal.css";

export const Terminal = ({printLogs}) => {
    const logs = printLogs ?
        printLogs.map((print, index) => {
            const lostClass = print.isLost ?  "Lost" : "moving";
            const onTerminal = index === 0 ? "one-robot-latest-log" :  "one-robot-log";

            return (
                print.currentCoordinate ? <div key={`terminal-${index}`} className={`${lostClass} ${onTerminal}` }>
                    >{print.name}<br />
                    >{print.currentCoordinate}<br />
                    >{print.instruction}<br />
                    >{lostClass}<br />
                    ---------------------------------------
                </div> : <div className={index === 0 ? "one-map-latest-log" :  "one-map-log" }>
                    >
                </div>
            )
        }): null;
    return (
        <div className="console">  
            <header>
            <h1 data-testid="application-heading">Mars Rover project</h1>
            </header>
             <div  class="consolebody">
                <p>></p>
                {logs}
            </div>
        </ div>
    );
};

export default Terminal;