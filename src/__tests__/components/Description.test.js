import { render, screen } from '@testing-library/react';
import Description from '../../components/Description';

describe('Renders Description', () => {
  test('No description provided', () => {
    render(<Description />);

    expect(screen.getByTestId('description').textContent.includes('No description provided')).toBe(
      true
    );
  });

  test('Description property passed in', () => {
    render(<Description description="description" />);

    expect(screen.getByTestId('description').textContent.includes('description')).toBe(true);
  });
});
