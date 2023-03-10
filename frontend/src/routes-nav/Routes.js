import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from '../Home';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import ProfileForm from '../auth/ProfileForm';
import CompanyList from '../companies/CompanyList';
import CompanyDetail from '../companies/CompanyDetail';
import JobList from '../jobs/JobList';
import JobDetail from '../jobs/JobDetail';
import "./Routes.css";

function Routes({signup, login}) {
    return (
        <div className='Routes'>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/login">
                    <LoginForm login={login}/>
                </Route>
                <Route exact path="/signup">
                    <SignupForm signup={signup}/>
                </Route>
                <Route exact path="/profile">
                    <ProfileForm />
                </Route>
                <Route exact path="/companies">
                    <CompanyList />
                </Route>
                <Route exact path="/companies/:handle">
                    <CompanyDetail />
                </Route>
                <Route exact path="/jobs">
                    <JobList />
                </Route>
                <Route exact path="/jobs/:id">
                    <JobDetail />
                </Route>
                <Route>
                    <div className='404'>
                        Page not found
                    </div>
                </Route>
                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default Routes;