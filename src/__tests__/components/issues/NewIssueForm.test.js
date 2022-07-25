import { fireEvent, render, screen } from '@testing-library/react';
import NewIssueForm from '../../../components/issues/NewIssueForm';
import { DEFAULT_ASSIGNEES, DEFAULT_LABELS } from '../../../utils/tests-data';

describe('Interacts with NewIssueForm', () => {
  const submitHandler = jest.fn();

  it('Fails to submit an empty form', () => {
    render(
      <NewIssueForm
        assignees={DEFAULT_ASSIGNEES}
        labels={DEFAULT_LABELS}
        onSubmit={submitHandler}
      />
    );

    const submitButton = screen.getByTestId('submit-button');
    const titleWrapper = screen.getByTestId('title');
    const titleInput = titleWrapper.querySelector('input');

    fireEvent(
      submitButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(submitHandler).not.toHaveBeenCalled();
    expect(titleInput.value).toEqual('');
    expect(titleWrapper.querySelector('.Mui-error')).not.toBe(null);
  });

  it('Submits a form with manually entered title', () => {
    render(
      <NewIssueForm
        assignees={DEFAULT_ASSIGNEES}
        labels={DEFAULT_LABELS}
        onSubmit={submitHandler}
      />
    );

    const submitButton = screen.getByTestId('submit-button');
    const titleWrapper = screen.getByTestId('title');
    const titleInput = titleWrapper.querySelector('input');

    fireEvent.change(titleInput, { target: { value: 'New Issue' } });

    fireEvent(
      submitButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(titleInput.value).toEqual('New Issue');
    expect(submitHandler).toHaveBeenCalledTimes(1);
  });
});
