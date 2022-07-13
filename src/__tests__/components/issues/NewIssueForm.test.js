import { fireEvent, render, screen } from '@testing-library/react';
import NewIssueForm from '../../../components/issues/NewIssueForm';
import { DEFAULT_ASSIGNEES, DEFAULT_LABELS } from '../../../utils/tests-data';

describe('Interacts with NewIssueForm', () => {
  it('Renders with all nom-empty props', () => {
    render(
      <NewIssueForm assignees={DEFAULT_ASSIGNEES} labels={DEFAULT_LABELS} onChange={() => {}} />
    );

    const titleWrapper = screen.getByTestId('title');
    const titleInput = titleWrapper.querySelector('input');
    expect(titleInput.value).toBe('');
    fireEvent.change(titleInput, { target: { value: 'New issuee from the app' } });
    expect(titleInput.value).toBe('New issuee from the app');

    const bodyWrapper = screen.getByTestId('body');
    const bodyTextarea = bodyWrapper.querySelector('textarea');
    fireEvent.change(bodyTextarea, { target: { value: 'New issue description' } });
    expect(bodyTextarea.value).toBe('New issue description');

    const assigneesWrapper = screen.getByTestId('assignees');
    const assigneesSelect = assigneesWrapper.querySelector('input');
    expect(assigneesSelect.value).toEqual('');

    const labelsWrappers = screen.getAllByTestId('label');
    const labelsCheckboxes = labelsWrappers.map((labelWrapper) => {
      return labelWrapper.querySelector('input');
    });
    fireEvent.change(labelsCheckboxes[0], { target: { checked: true } });
    fireEvent.change(labelsCheckboxes[1], { target: { checked: true } });
    expect(labelsCheckboxes[0].checked).toBe(true);
    expect(labelsCheckboxes[1].checked).toBe(true);
    expect(labelsCheckboxes[2].checked).toBe(false);
  });
});
