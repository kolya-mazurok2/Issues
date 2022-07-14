import { AppBar, List, ListItem, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { PATH_HOME, PATH_ISSUES_NEW, PATH_LABELS } from '../../routing/pathes';

const Header = () => {
  return (
    <AppBar position="relative" className="nav-header">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          <Link to={PATH_HOME}>Issues</Link>
        </Typography>
      </Toolbar>

      <List className="pages-menu">
        <ListItem className="pages-menu--item">
          <Link to={PATH_ISSUES_NEW}>New Issue</Link>
        </ListItem>

        <ListItem className="pages-menu--item">
          <Link to={PATH_LABELS}>Labels</Link>
        </ListItem>
      </List>
    </AppBar>
  );
};

export default Header;
