import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { ContactRoutes } from "../modules/contact/contact.route";
const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/contacts",
    route: ContactRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
