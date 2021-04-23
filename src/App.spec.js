import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import App from './App';

describe("App", () => {
  afterEach(cleanup);
  beforeEach(()=> render(<App />));
  it('should take a snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment(<App />)).toMatchSnapshot()
  });
});
