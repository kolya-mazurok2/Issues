import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import { useEffect, useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export type OptionType = '' | 'assignee' | 'label';

interface Props {
  optionType: OptionType;
  dialogOpen?: boolean;
  inputOptions: string[];
  inputSelectedOptions?: string[];
  onClose: (options: string[], update: boolean, type: OptionType) => void;
}

const IssueUpdateDialog = ({
  optionType,
  dialogOpen = false,
  inputOptions,
  inputSelectedOptions = [],
  onClose,
}: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleClose = () => {
    onClose([], false, optionType);
  };

  const handleChange = (values: string) => {
    setSelectedOptions(typeof values === 'string' ? values.split(',') : values);
  };

  const handleClickUpdate = () => {
    onClose(selectedOptions, true, optionType);
  };

  useEffect(() => {
    setSelectedOptions([...inputSelectedOptions]);
  }, [inputSelectedOptions]);

  return (
    <Dialog disableEscapeKeyDown open={dialogOpen} onClose={handleClose}>
      <DialogContent>
        <FormControl sx={{ m: 1, minWidth: 250 }}>
          <Select
            multiple
            value={selectedOptions}
            onChange={(event) => {
              handleChange(event.target.value as string);
            }}
            renderValue={() =>
              inputOptions
                .filter((inputOption) => selectedOptions.indexOf(inputOption) !== -1)
                .join(', ')
            }
            MenuProps={MenuProps}
          >
            {inputOptions.map((inputOption, index) => {
              return (
                <MenuItem key={index} value={inputOption}>
                  <Checkbox checked={selectedOptions.indexOf(inputOption) !== -1} />
                  <ListItemText primary={inputOption} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClickUpdate}>Update</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default IssueUpdateDialog;
