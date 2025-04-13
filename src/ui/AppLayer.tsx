import { Outlet } from "react-router-dom"
import Header from "../components/Header"

const AppLayer = () => {
  return (
    <>
      <Header />

      <main className="mt-20" >
        <Outlet />
      </main>
      </>
  )
}

export default AppLayer