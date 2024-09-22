import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CssBaseline } from "@mui/material";

//importing pages and components
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import PageNotFound from "./pages/PageNotFound";
import ForgotPass from "./pages/ForgotPass";
import MainBillViewer from "./pages/MainBillPage";
import Profile from "./pages/Home";
import Payment from "./pages/Payment";
import Services from "./pages/Services";
import Vas from "./pages/ValueAddedServices";
import Chat from "./pages/Chat";
import Account from "./pages/Account";

function App() {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Profile />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPass />} />
              <Route path="/bills" element={<MainBillViewer />} />
              <Route path="/account" element={<Account />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/services" element={<Services />} />
              <Route path="/vas" element={<Vas />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
