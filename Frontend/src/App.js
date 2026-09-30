import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthForm from "./components/Authentication/AuthForm";
import Header from "./components/Layout/Header";
import RootLayout from "./components/Layout/RootLayout";
import AddBook from "./components/Books/AddBook";
import { useSelector } from "react-redux";
import BookList from "./components/Books/BookList";
import BookDetail from "./components/Books/BookDetail";
import BookRequests from "./components/Books/BookRequests";
import MyBooks from "./components/Books/MyBooks";
import { ToastContainer } from "react-toastify";
import StatusBooks from "./components/Books/StatusBooks";
import NotFound from "./components/Layout/NotFound";
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  return (
    <RootLayout>
      <ToastContainer />
      <Switch>
        {!isLoggedIn && (
          <Route path="/" exact>
            <AuthForm />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/home" exact>
            <BookList />
          </Route>
        )}
        {isLoggedIn && isAdmin && (
          <Route path="/add-book" exact>
            <AddBook />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/home/:bookId">
            <BookDetail />
          </Route>
        )}
        {isLoggedIn && isAdmin && (
          <Route path="/book-requests">
            <BookRequests />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/my-books">
            <MyBooks />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/status">
            <StatusBooks />
          </Route>
        )}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </RootLayout>
  );
}

export default App;
