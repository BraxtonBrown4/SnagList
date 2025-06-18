import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { MyLists } from "./MyLists";
import { ListDetails } from "./ListDetails";
import { NewList } from "./New-List";
import { EditList } from "./EditList";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          path="/My-Lists"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <MyLists loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }
        />

        <Route
          path="/Lists/:listId/:isPublic"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <ListDetails loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }
        />

        <Route
          path="/Edit/:editId"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <EditList loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }
        />

        <Route
          path="/New-List"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <NewList loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }
        />

        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />

        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />

      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
