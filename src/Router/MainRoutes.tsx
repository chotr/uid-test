import Layout from "../Layout/layout"
import CreateProduct from "../Pages/createProduct"
import Home from "../Pages/home"
import ProductListPage from "../Pages/productList"


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
    {
      path: '/products',
      element: <ProductListPage />
    },
  ]
}

export default MainRoutes
