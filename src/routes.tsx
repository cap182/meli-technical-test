import React from "react"
import { createBrowserRouter, Outlet } from "react-router-dom"
const CharacterList = React.lazy(() =>
  delayedImport(import("./app/pages/characterList/CharacterList"), 2000),
)
const FavoriteList = React.lazy(() => import("./app/pages/favoriteList/FavoriteList"))
const CharacterInfo = React.lazy(() => import("./app/pages/characterInfo/CharacterInfo"))
import NavBar from "./app/components/navBar/NavBar"
import { delayedImport } from "./utils/local-storage-util"
import MessagePage from "./app/components/messagePage/MessagePage"

const Layout = () => (
  <>
    <NavBar />
    <div style={{ padding: "20px" }}>
      <Outlet />
    </div>
  </>
)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <CharacterList /> },
      { path: "/favorites", element: <FavoriteList /> },
      { path: "/character/:id", element: <CharacterInfo /> },
      { path: "*", element: <MessagePage message="404 - Page Not Found" /> },
    ],
  },
])

export default router
