import { render, screen, cleanup } from '@testing-library/react';
import Planet from './Planet';

describe("Robots", () => {
  afterEach(cleanup);

  it('should take a snapshot', () => {
    const { asFragment } = render(<Planet />)
    expect(asFragment(<Planet />)).toMatchSnapshot()
  });
});