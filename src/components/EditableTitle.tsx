import { Button, ButtonGroup, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { clone } from 'lodash';
import { useMemo, useState } from 'react';

interface Props {
  title: string;
  onChange: (title: string) => void;
}

const EditableTitle = ({ title, onChange }: Props) => {
  const defaultTitle = useMemo(() => clone(title), [title]);

  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(defaultTitle);
  const [error, setError] = useState(false);

  const handleTitleChange = (title: string) => {
    setNewTitle(title);

    setError(Boolean(!title.length));
  };

  const handleClickEdit = () => setEdit(!edit);

  const handleClickDiscard = () => setEdit(false);

  const handleClickSave = () => {
    if (error) {
      return;
    }

    if (newTitle === defaultTitle) {
      setEdit(false);
      return;
    }

    onChange(newTitle);
    setEdit(false);
  };

  return (
    <Box className="editable-title">
      {edit ? (
        <div className="title-edit">
          <TextField
            type="text"
            value={newTitle}
            error={error}
            onChange={(event) => {
              handleTitleChange(event.currentTarget.value);
            }}
          />

          <ButtonGroup>
            <Button variant="outlined" color="warning" onClick={handleClickDiscard}>
              Discard
            </Button>

            <Button variant="outlined" color="success" onClick={handleClickSave}>
              Save
            </Button>
          </ButtonGroup>
        </div>
      ) : (
        <div className="title">
          <Typography variant="h4">{title}</Typography>

          <Button variant="outlined" color="secondary" onClick={handleClickEdit}>
            Edit
          </Button>
        </div>
      )}
    </Box>
  );
};

export default EditableTitle;
