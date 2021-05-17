import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Post } from "./pages/Post";
import { Bye } from "./pages/Bye";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Register } from "./pages/Register";
import { Messages } from "./pages/Messages";
import { SingleUser } from "./pages/SingleUser";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/post/:postID" component={Post} />
        <Route path="/user/:userID" component={SingleUser} />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/bye" component={Bye} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/messages" component={Messages} />
      </Switch>
    </BrowserRouter>
  );
};
