import { fireEvent, render, screen } from '@testing-library/react';
import AlertDialog from '../../components/AlertDialog';

describe('Interacts with an AlertDialog', () => {
  const handleConfirm = jest.fn();

  beforeEach(() => {
    render(<AlertDialog onConfirm={handleConfirm} />);

    fireEvent.click(screen.getByTestId('open-button'));
  });

  test('Dismisses an action', async () => {
    expect(screen.getByTestId('dialog')).not.toBe(null);

    fireEvent.click(screen.getByTestId('dismiss-button'));
    setTimeout(() => {
      expect(screen.getByTestId('dialog')).toBe(null);
    }, 100);
  });

  it('Confirms an action', async () => {
    fireEvent.click(screen.getByTestId('confirm-button'));

    expect(handleConfirm).toHaveBeenCalled();
    setTimeout(() => {
      expect(screen.getByTestId('dialog')).toBe(null);
    }, 100);
  });
});
