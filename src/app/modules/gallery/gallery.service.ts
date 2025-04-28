import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { TGallery } from "./gallery.interface";
import { Gallery } from "./gallery.model";

const createGalleryIntoDB = async (payload: TGallery) => {
  const result = await Gallery.create(payload);
  return result;
};

const getAllGalleryFromDB = async () => {
  const result = await Gallery.find();
  return result;
};

const updateGalleryIntoDB = async (
  galleryId: string,
  payload: Partial<TGallery>
) => {
  const gallery = await Gallery.isGalleryExists(galleryId);

  if (!gallery) {
    throw new AppError(StatusCodes.NOT_FOUND, "Gallery not found");
  }

  const result = await Gallery.findByIdAndUpdate(galleryId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteGalleryFromDB = async (galleryId: string) => {
  const gallery = await Gallery.isGalleryExists(galleryId);

  if (!gallery) {
    throw new AppError(StatusCodes.NOT_FOUND, "Gallery not found!");
  }

  await Gallery.findByIdAndDelete(galleryId);
  return null;
};

export const GalleryService = {
  createGalleryIntoDB,
  getAllGalleryFromDB,
  updateGalleryIntoDB,
  deleteGalleryFromDB,
};
