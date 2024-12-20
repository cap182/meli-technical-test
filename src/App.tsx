import { Suspense } from "react"
import "./App.css"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"
import LoadingScreen from "./app/components/loadingScreen/LoadingScreen"
import { store } from "./app/store"
import router from "./routes"

const App = () => {
  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </Suspense>
    </>
  )
}

export default App
