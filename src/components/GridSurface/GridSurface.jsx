import React, {useState, useEffect} from 'react';
import {
    GridRow
  } from "../../modules";
import "./GridSurface.css";

const GridSurface = ({dimension, lostCell={}, robotPosition={}}) => {
    return (
            <table cellspacing="0" border="1" width="100%" height="100%" class="grid-container">
                <GridRow dimension={dimension} lostCell={lostCell} robotPosition={robotPosition} />
            </table>
    );
};

export default GridSurface;