import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { ContactController } from "./contact.controller";
import { ContactValidations } from "./contact.validation";
import { upload } from "../../utils/upload"; // Import the upload middleware

const router = Router();

router.post(
  "/create-contact",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(ContactValidations.createContactValidationSchema),
  ContactController.createContact
);

export const ContactRoutes = router; // Corrected export name
