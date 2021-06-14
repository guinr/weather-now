import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders Header', () => {
  render(<Header />);
  
  const logo = screen.getByRole('img');
  expect(logo).toHaveAttribute('src', 'logo.svg');
  expect(logo).toHaveAttribute('alt', 'Logo Weather Now');
});