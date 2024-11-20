// import logo from './logo.svg';
// import './App.css';
// import Register from './components/Register/Register';
import Login from './components/Login/Login';
import PasswordReset from './components/PasswordReset/PasswordReset'
import StepOne from './components/EventCreation/StepOne';
import StepTwo from './components/EventCreation/StepTwo';
import StepThree from './components/EventCreation/StepThree';
import StepFour from './components/EventCreation/StepFour';





function App() {
  return (
    <div className="App">
   {/* <Register/> */}
    <Login/>
    {/* <PasswordReset/> */}
    <StepOne />
    {/* <StepTwo /> */}
    <StepThree />
    <StepFour />
    </div>
  );
}

export default App;
