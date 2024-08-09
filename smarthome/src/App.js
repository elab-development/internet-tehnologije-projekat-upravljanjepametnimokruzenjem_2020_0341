import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Username from './pages/Username';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function App() {
  return <div>SmartHome</div>;
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/username' element={<Username />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
