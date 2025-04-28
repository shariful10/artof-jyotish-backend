import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { ContactRoutes } from "../modules/contact/contact.route";
import { MediaRoutes } from "../modules/media/media.route";
import { GalleryRoutes } from "../modules/gallery/gallery.route";
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
  {
    path: "/media",
    route: MediaRoutes,
  },
  {
    path: "/galleries",
    route: GalleryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
