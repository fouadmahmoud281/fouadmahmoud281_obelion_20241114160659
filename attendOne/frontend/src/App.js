import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import PasswordReset from './components/PasswordReset/PasswordReset';
import Register from './components/Register/Register';
import StepOne from './components/EventCreation/StepOne';
import StepTwo from './components/EventCreation/StepTwo';
import StepThree from './components/EventCreation/StepThree';
import StepFour from './components/EventCreation/StepFour';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/event/step-one" element={<StepOne />} />
        <Route path="/event/step-two" element={<StepTwo />} />
        <Route path="/event/step-three" element={<StepThree />} />
        <Route path="/event/step-four" element={<StepFour />} />
      </Routes>
    </div>
  );
}

export default App;
