import {Route, Routes} from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css'; //importing Materialize CSS
import 'materialize-css/dist/js/materialize.min.js'; //importing Materialize's JS components
import Landing from "./pages/landing";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import HomePage from "./pages/home";


const App = () => {

  return (
    <div>
        <Routes>
          {/* Routes go here */}
          <Route path="/" element={<Landing/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<HomePage/>}/>
        </Routes>
    </div>
  )
}

export default App
