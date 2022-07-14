import { Box, Container } from '@mui/system';

const NotFound = () => {
  return (
    <Box className="page page--not-found">
      <Container maxWidth="lg">
        <img src="./images/not-found.jpeg" alt="not-found" />
      </Container>
    </Box>
  );
};

export default NotFound;
