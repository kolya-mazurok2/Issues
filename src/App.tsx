import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes } from 'react-router-dom';
import Header from './components/UI/Header';
import { appRouteElements } from './routing';
import store from './store';

const App = () => {
  const theme = createTheme();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <BrowserRouter>
            <HeaderWrapper>
              <Header />
            </HeaderWrapper>

            <Routes>{appRouteElements}</Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
