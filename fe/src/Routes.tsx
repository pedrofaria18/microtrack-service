import { Navigate, Route, Routes } from 'react-router-dom';
import TracesList from './pages/TracesList';
import Trace from './pages/Trace';

export default function ApplicationRoutes() {
  return (
    <Routes>
      <Route index path="/" element={<Navigate to="/traces" replace />} />
      <Route index path="/traces" element={<TracesList />} />
      <Route path="/traces/:traceId" element={<Trace />} />
    </Routes>
  );
}
