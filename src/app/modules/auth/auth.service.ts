import { createToken } from "./auth.utils";
import config from "../../config";
import { validateUser } from "../../utils/validateUser";
import { TAuth } from "./auth.interface";

const loginUser = async (payload: TAuth) => {
  const user = await validateUser(payload?.email);

  const jwtPayload = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
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

// const refreshToken = async (token: string) => {
//   let verifiedToken = null;
//   try {
//     verifiedToken = verifyToken(token, config.jwt_refresh_secret as Secret);
//   } catch (err) {
//     throw new AppError(StatusCodes.FORBIDDEN, "Invalid Refresh Token");
//   }

//   const { userId } = verifiedToken;

//   const isUserExist = await User.findById(userId);
//   if (!isUserExist) {
//     throw new AppError(StatusCodes.NOT_FOUND, "User does not exist");
//   }

//   if (!isUserExist.isActive) {
//     throw new AppError(StatusCodes.BAD_REQUEST, "User is not active");
//   }

//   const jwtPayload: TJwtPayload = {
//     userId: isUserExist._id as string,
//     name: isUserExist.name as string,
//     email: isUserExist.email as string,
//     hasShop: isUserExist.hasShop,
//     isActive: isUserExist.isActive,
//     role: isUserExist.role,
//   };

//   const newAccessToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as Secret,
//     config.jwt_access_expires_in as string
//   );

//   return {
//     accessToken: newAccessToken,
//   };
// };

// const changePassword = async (
//   userData: JwtPayload,
//   payload: { oldPassword: string; newPassword: string }
// ) => {
//   const { userId } = userData;
//   const { oldPassword, newPassword } = payload;

//   const user = await User.findOne({ _id: userId });
//   if (!user) {
//     throw new AppError(StatusCodes.NOT_FOUND, "User not found");
//   }
//   if (!user.isActive) {
//     throw new AppError(StatusCodes.FORBIDDEN, "User account is inactive");
//   }

//   // Validate old password
//   const isOldPasswordCorrect = await User.isPasswordMatched(
//     oldPassword,
//     user.password
//   );
//   if (!isOldPasswordCorrect) {
//     throw new AppError(StatusCodes.FORBIDDEN, "Incorrect old password");
//   }

//   // Hash and update the new password
//   const hashedPassword = await bcrypt.hash(
//     newPassword,
//     Number(config.bcrypt_salt_rounds)
//   );
//   await User.updateOne({ _id: userId }, { password: hashedPassword });

//   return { message: "Password changed successfully" };
// };

export const AuthService = {
  loginUser,
};
