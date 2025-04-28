import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { TMedia } from "./media.interface";
import { Media } from "./media.model";

const createMediaIntoDB = async (payload: TMedia) => {
  const result = await Media.create(payload);
  return result;
};

const getAllMediaFromDB = async () => {
  const result = await Media.find();
  return result;
};

const updateMediaIntoDB = async (mediaId: string, payload: Partial<TMedia>) => {
  const media = await Media.isMediaExists(mediaId);

  if (!media) {
    throw new AppError(StatusCodes.NOT_FOUND, "Media not found");
  }

  const result = await Media.findByIdAndUpdate(mediaId, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteMediaFromDB = async (mediaId: string) => {
  const media = await Media.isMediaExists(mediaId);

  if (!media) {
    throw new AppError(StatusCodes.NOT_FOUND, "Media not found!");
  }

  await Media.findByIdAndDelete(mediaId);
  return null;
};

export const MediaService = {
  createMediaIntoDB,
  getAllMediaFromDB,
  updateMediaIntoDB,
  deleteMediaFromDB,
};
