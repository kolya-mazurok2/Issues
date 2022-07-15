import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

type ButtonColor = 'error' | 'success';

interface Props {
  openButton?: {
    name: string;
    color: ButtonColor;
  };
  onConfirm?: () => void;
}

const AlertDialog = ({
  openButton = {
    name: 'Open',
    color: 'success',
  },
  onConfirm,
}: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmClick = () => {
    handleClose();

    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <div className="alert-dialog">
<Button
        variant="outlined"
        onClick={handleClickOpen}
        color={openButton.color}
        data-testid="open-button"
      >
        {openButton.name}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        data-testid="dialog"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure? This action can not be undone!
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} data-testid="dismiss-button">
            Dismiss
          </Button>

          <Button onClick={handleConfirmClick} autoFocus data-testid="confirm-button">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
