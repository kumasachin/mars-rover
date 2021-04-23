import React, {useState, useEffect} from 'react';
import "./GridColumn.css";

const GridColumn = ({dimension, lostCell={}, rowIndex, robotPosition={}}) => {
    const renderColumn= () => {
        let columns = [];
        for (let index=0; index<dimension.x; index++) {
            const lostCellClass = lostCell.x && lostCell.x.includes(index) ? "lostCell" : "";
            const isRoboInCell = rowIndex === robotPosition.y && index === robotPosition.x;
            
            columns.push(<td className={`grid-column column-${index} ${lostCellClass} `}>
                {isRoboInCell ? <span>&#11014;</span> : <span />}
            </td>);
        }
        return columns;
    }

    return (
            <>
                {renderColumn()}
            </>
    );
};

export default GridColumn;