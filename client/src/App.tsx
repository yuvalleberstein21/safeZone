import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  const element = useRoutes(routes);
  return (
    <div dir="rtl">
      {element}
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
