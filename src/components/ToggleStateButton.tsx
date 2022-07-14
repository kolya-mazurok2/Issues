import { Button } from '@mui/material';
import { State } from '../types';

interface Props {
  currentState: State;
  onChange: (newState: State) => void;
}

const ToggleStateButton = ({ currentState, onChange }: Props) => {
  return (
    <>
      {currentState === 'open' && (
        <Button
          variant="outlined"
          color="warning"
          onClick={() => {
            onChange('closed');
          }}
        >
          Close
        </Button>
      )}

      {currentState === 'closed' && (
        <Button
          variant="outlined"
          color="success"
          onClick={() => {
            onChange('open');
          }}
        >
          Open
        </Button>
      )}
    </>
  );
};

export default ToggleStateButton;
