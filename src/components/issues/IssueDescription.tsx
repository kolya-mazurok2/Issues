import { Card, CardContent } from '@mui/material';
import { Markup } from 'interweave';

interface Props {
  description?: string;
}

const NO_DESCRIPTION = 'No description provided';

const IssueDescription = ({ description = NO_DESCRIPTION }: Props) => {
  return (
    <Card className="issue-description">
      <CardContent>
        <Markup content={description && description.length ? description : NO_DESCRIPTION} />
      </CardContent>
    </Card>
  );
};

export default IssueDescription;
