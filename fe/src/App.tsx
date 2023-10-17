import { BrowserRouter } from 'react-router-dom';
import ApplicationRoutes from './Routes';

function App() {
  return (
    <div
      className="
        w-full
        max-w-[1200px]
        mx-auto
        px-4
      "
    >
      <BrowserRouter>
        <ApplicationRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
