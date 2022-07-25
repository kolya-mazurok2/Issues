import { List, ListItem, Typography } from '@mui/material';
import { Label } from '../../types';

interface Props {
  labels?: Label[];
  className?: string;
}

const LabelList = ({ labels = [], className = '' }: Props) => {
  return labels.length ? (
    <List className={className}>
      {labels.map((label) => {
        return (
          <ListItem
            key={label.id}
            className="label-list--item"
            sx={{ backgroundColor: `#${label.color}` }}
          >
            {label.name}
          </ListItem>
        );
      })}
    </List>
  ) : (
    <Typography variant="body1">No labels</Typography>
  );
};

export default LabelList;
