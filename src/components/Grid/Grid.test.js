import { render, screen, cleanup } from '@testing-library/react';
import Grid from './Grid';

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
        name: "Chintu",
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