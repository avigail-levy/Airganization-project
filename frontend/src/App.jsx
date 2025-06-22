import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
    <input type='file'/>
    <input type='color'/>

     <Outlet />
    </>
  )
}
export default App
