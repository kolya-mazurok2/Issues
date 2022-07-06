import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import DataTable from '../components/DataTable';
import DataTableWrapper from '../components/DataTableWrapper';

const Home = () => {
  return (
    <Box className="page page--home">
      <Container maxWidth="lg">
        <Typography variant="h4" align="center">
          Issue list
        </Typography>

        <DataTableWrapper>
          <DataTable items={[]} />
        </DataTableWrapper>
      </Container>
    </Box>
  );
};

export default Home;
