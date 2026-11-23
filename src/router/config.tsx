import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Produtos from "../pages/produtos/page";
import CasinhaDetail from "../pages/casinha/page";
import Admin from "../pages/admin/page";
import Entrar from "../pages/entrar/page";
import RequireAdmin from "../lib/RequireAdmin";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/produtos",
    element: <Produtos />,
  },
  {
    path: "/casinha/:id",
    element: <CasinhaDetail />,
  },
  {
    path: "/entrar",
    element: <Entrar />,
  },
  {
    path: "/admin",
    element: (
      <RequireAdmin>
        <Admin />
      </RequireAdmin>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
