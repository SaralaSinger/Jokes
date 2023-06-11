import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { ContextComponent } from './Context';
import Layout from './Layout';
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import ViewAll from './ViewAll';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';

const App = () => {
    return (
        <ContextComponent>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/viewall' element={<ViewAll />} />
                    <Route exact path='/signup' element={<Signup />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/logout' element={
                        <PrivateRoute>
                            <Logout />
                        </PrivateRoute>
                    } />
                </Routes>
            </Layout>
        </ContextComponent>
    );
};


export default App;