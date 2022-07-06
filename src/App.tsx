import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/UI/Header';
import Home from './pages/Home';
import HomeWrapper from './pages/HomeWrapper';

const App = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />

        <HomeWrapper>
          <Home />
        </HomeWrapper>
      </div>
    </ThemeProvider>
  );
};

export default App;
