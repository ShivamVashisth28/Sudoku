import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Game from "./pages/Game"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Game />} />
           
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
