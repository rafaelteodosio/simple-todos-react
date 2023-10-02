import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { TaskContainer } from './TaskContainer';
import { Route, Routes } from 'react-router-dom';
import { Header } from './Header';
import { SignUpForm } from './SignUpForm';
import { Dashboard } from './Dashboard';
import { EditTask } from './EditTask';
import { UserProfile } from './UserProfile';

export const App = () => {
  const user = useTracker(() => Meteor.user());
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/tasks" element={user ? <TaskContainer /> : <LoginForm />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/edittask/:id" element={<EditTask />} />
        <Route path="/profile" element={user ? <UserProfile /> : <LoginForm />} />
        <Route path="*" element={<LoginForm />} />
      </Routes>
    </div>
  );
};