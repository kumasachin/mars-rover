import { render, screen, cleanup } from '@testing-library/react';
import Terminal from './Terminal';

describe("Trades", () => {
  afterEach(cleanup);

  it('should take a snapshot', () => {
    const { asFragment } = render(<Terminal />)
    expect(asFragment(<Terminal />)).toMatchSnapshot()
  });

});