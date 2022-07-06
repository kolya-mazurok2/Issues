import { useEffect } from 'react';
import { find, findAll } from './services/http/issues/methods';

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await findAll();

      const responseOne = await find(3);

      console.log(response, responseOne);
    };

    fetchData();
  }, []);

  return <div className="App">GitHub Issues</div>;
};

export default App;
