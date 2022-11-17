import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes, BrowserRouter } from 'react-router-dom'
import './scss/style.scss'
// Containers
import DefaultLayout from './layout/DefaultLayout'
// Pages
import Login from './pages/login/Login'
// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

class App extends Component {
  render() {
    return (
      <Suspense fallback={loading}>
        <Routes>
          <Route path="*" name="Home" element={<DefaultLayout />} />
          <Route exact path="/admin/login" name="Login Page" element={<Login />} />
          {/* <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
        </Routes>
      </Suspense>
    )
  }
}

export default App
