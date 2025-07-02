import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import RequestOTP from './pages/RequestOTP';
import VerifyOTP from './pages/VerifyOTP';
import AdminPenal from './pages/AdminPenal';
import UserManagementPanel from './pages/UserManagementPenal';
import VacationPanel from './pages/VacationPanel';
import ClassesPanel from './pages/ClassesPenal';
import VacationViewer from './pages/VacationViewer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
          <Route path="/request-otp" element={<RequestOTP />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />

          <Route path="/admin-panel" element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminPenal />
            </PrivateRoute>
          } />

          <Route path="/admin-panel/user" element={
            <PrivateRoute allowedRoles={['admin']}>
              <UserManagementPanel />
            </PrivateRoute>
          } />

          <Route path="/admin-panel/vacation" element={
            <PrivateRoute allowedRoles={['admin']}>
              <VacationPanel />
            </PrivateRoute>
          } />

          <Route path="/admin-panel/classes" element={
            <PrivateRoute allowedRoles={['admin']}>
              <ClassesPanel />
            </PrivateRoute>
          } />

          <Route path="/vacations" element={
            <PrivateRoute allowedRoles={['student', 'teacher']}>
              <VacationViewer />
            </PrivateRoute>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
