import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import './App.css';

function App() {
  const element = useRoutes(routes);
  return (
    <div className="p-4" dir="rtl">
      {element}
    </div>
  );
}

export default App;
