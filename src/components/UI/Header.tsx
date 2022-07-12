import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { PATH_HOME } from '../../routing/pathes';

const Header = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          <Link to={PATH_HOME}>Issues</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
