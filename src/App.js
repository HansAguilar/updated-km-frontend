import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PrivateRoutes from './utils/PrivateRoutes';
import Dashboard from './pages/Dashboard';
import VerifyEmail from './pages/VerifyEmail';
import ResetPassword from './pages/ResetPassword';
import './index.css'
import PrivateChangePasswordRoute from './utils/PrivateChangePasswordRoute';
import PageNotFound from './pages/PageNotFound';
import 'react-toastify/dist/ReactToastify.css';

function App(props) {
    return (
        <Router>
            <Routes>
                <Route element={ <PrivateRoutes/> }>
                    <Route element={<Dashboard />} path='/admin/dashboard/*' />
                </Route>
                <Route element={ <PrivateChangePasswordRoute /> }>
                    <Route element={<ResetPassword />} path='/recoveraccount/resetpassword/:id' />
                </Route>
                <Route element={<Login />} path='/' />
                <Route element={<VerifyEmail />} path='/recoveraccount' />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </Router>
    );
}

export default App;