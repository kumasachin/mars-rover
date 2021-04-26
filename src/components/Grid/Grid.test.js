import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import Enzyme, {  mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Grid from './Grid';

Enzyme.configure({ adapter: new Adapter() })
const defaultState = {
  "dimension":{
     "x":16,
     "y":16
  },
  "robots":[
     {
        "name":"R1",
        "color":"green",
        "currentPosition":"0 0 N",
        "instructions":"FFFFFFFFFFFFFFFFFFF",
        "x":0,
        "y":0,
        "d":"N"
     },
     {
        "name":"R2",
        "color":"green",
        "currentPosition":"0 14 N",
        "instructions":"FRFFFFFFF",
        "x":0,
        "y":14,
        "d":"N"
     }
  ],
  "lostCell":{
     "x":[
        
     ],
     "y":[
        
     ]
  },
  "excutionStatus":true
}

describe("Trades", () => {
  afterEach(cleanup);
  const marsRover = {
    map: {
        x: 6,
        y: 6
    },
    lostCell: {
        x: [3],
        y: [2]
    },
    robots: [{
        name: "R",
        x: 1,
        y: 1,
        d: "N",
        color: "red",
        currentPosition: "1 1 N",
        instructions: "FRFR"
    },{
        name: "Montu",
        x: 1,
        y: 1,
        d: "N",
        color: "green",
        currentPosition: "1 2 E",
        instructions: "FLFR"
    }]
};

  it('should take a snapshot', () => {
    const { asFragment } = render(<Grid />)
    expect(asFragment(<Grid
      dimension={marsRover.map}
      robotPosition={marsRover.robots}
      lostCell={marsRover.lostCell}
    />)).toMatchSnapshot()
  });
  
});

describe("Grid Grid rendering", () => {
  afterEach(cleanup);
 

  it('should take a snapshot', () => {
    const { asFragment } = render(<Grid 
        {...defaultState}
        excutionStatus = {true}
    />)
    expect(asFragment(<Grid />)).toMatchSnapshot()
  });
});

describe('<Grid /> should pre loading sceent', () => {
  it('should have the table container', async () => {
    const container01 = mount(<Grid 
      {...defaultState}
      excutionStatus = {true}
    />);
      expect(
        container01.find("table.grid-container").length
      ).toEqual(1)
  });
  it('should have the rows', async () => {
    const container01 = mount(<Grid 
      {...defaultState}
      excutionStatus = {true}
    />);
      expect(
        container01.find("tr.grid-row").length
      ).toEqual(16)
  });


  it('should have the columns', async () => {
    const container01 = mount(<Grid 
      {...defaultState}
      excutionStatus = {true}
    />);
      expect(
        container01.find("td.grid-column").length
      ).toEqual(256)
  });
});