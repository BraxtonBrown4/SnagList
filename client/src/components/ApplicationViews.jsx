import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { MyLists } from "./MyLists";
import { ListDetails } from "./ListDetails";
import { NewList } from "./New-List";
import { EditList } from "./EditList";
import { Tags } from "./Tags";
import { AllLists } from "./AllLists";
import { Profile } from "./Profile";
import { EditProfile } from "./EditProfile";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          path="/My-Lists"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <MyLists loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route
          path="/All-Lists"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <AllLists loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

        <Route
          path="/Lists/:listId/:isPublic"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <ListDetails loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

        <Route
          path="/Edit/:editId"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <EditList loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

        <Route
          path="/New-List"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <NewList loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

        <Route
          path="/Tags"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Tags />
            </AuthorizedRoute>
          }
        />

        <Route
          path="/Profile/:profileId"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Profile loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }
        />

        <Route
          path="/Profile/:profileId/Edit"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <EditProfile loggedInUser={loggedInUser} />
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
