import Layout from "../Layout/layout"
import CreateProduct from "../Pages/createProduct"
import Home from "../Pages/home"


const MainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/create-product',
      element: <CreateProduct />
    },

  ]
}

export default MainRoutes
