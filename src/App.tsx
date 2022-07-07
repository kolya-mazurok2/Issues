import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import Header from './components/UI/Header';
import Home from './pages/Home';
import HomeWrapper from './pages/HomeWrapper';
import store from './store';

const App = () => {
  const theme = createTheme();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header />

          <HomeWrapper>
            <Home />
          </HomeWrapper>
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
