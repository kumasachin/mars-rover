import React, {useState, useEffect} from 'react';
import {
    GridColumn
  } from "../../modules";
import "./GridRow.css";

const GridRow = ({dimension={}, lostCell={}, robotPosition={}}) => {
    const renderRows = () => {
        let rows = [];
        const {
            x,
            y
        } =  robotPosition;
        
        for (let index=dimension.y-1; index>=0; index--) {
            const isLostRowClass = lostCell.y && lostCell.y.includes(index) ? "lostRow" : "";

            rows.push(<tr className={`grid-row row-${index} ${isLostRowClass}`}>
                {
                   <GridColumn dimension={dimension} lostCell={lostCell} isLostRow={isLostRowClass && isLostRowClass} rowIndex={index} robotPosition={robotPosition} />
                }
            </tr>);
        }
        return rows;
    }

    return (
            <>
                {renderRows()}
            </>
    );
};

export default GridRow;