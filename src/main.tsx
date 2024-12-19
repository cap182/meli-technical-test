import React, { Suspense } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./index.css"
import { RouterProvider } from "react-router-dom";
import router from "./routes"
import LoadingScreen from "./app/components/loadingScreen/LoadingScreen"


const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    // <React.StrictMode>
      <Suspense fallback={<LoadingScreen />}>
      
        <Provider store={store}>

        <RouterProvider router={router} />

        </Provider>
      </Suspense>
    // </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
