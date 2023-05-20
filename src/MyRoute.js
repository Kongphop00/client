import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import FormComponent from "./components/FormComponent";
import SingleComponent from "./components/SingleComponent"
import EditComponent from "./components/EditComponent"
import LoginComponent from "./components/LoginComponent"
import PrivateRoute from "./PrivateRoute";

const MyRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={App} />
        <Route path="/create" element={<PrivateRoute><FormComponent/></PrivateRoute> } />
        <Route path="/blog/:slug" exact Component={ SingleComponent} />
        <Route path="/blog/edit/:slug" element={ <PrivateRoute><EditComponent/></PrivateRoute>} />
        <Route path="/login" exact Component={LoginComponent} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoute;
