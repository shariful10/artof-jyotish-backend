"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const validateUser_1 = require("../../utils/validateUser");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, validateUser_1.validateUser)(payload === null || payload === void 0 ? void 0 : payload.email);
    const jwtPayload = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, { expiresIn: "1d" });
    return {
        accessToken,
    };
});
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
exports.AuthService = {
    loginUser,
};
