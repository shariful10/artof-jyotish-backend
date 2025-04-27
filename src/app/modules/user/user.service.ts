import { TUser, UserRole } from "./user.interface";
import User from "./user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { UserSearchableFields } from "./user.constant";
import { createToken } from "../auth/auth.utils";
import config from "../../config";

// Function to register user
const registerUser = async (payload: TUser) => {
  await User.create(payload);

  const jwtPayload = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    role: UserRole.USER,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    { expiresIn: "1d" }
  );

  return {
    accessToken,
  };
};

const getAllUser = async (query: Record<string, unknown>) => {
  const UserQuery = new QueryBuilder(User.find(), query)
    .search(UserSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await UserQuery.modelQuery;
  const meta = await UserQuery.countTotal();
  return {
    result,
    meta,
  };
};

export const UserServices = {
  registerUser,
  getAllUser,
};
