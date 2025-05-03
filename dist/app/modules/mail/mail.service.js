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
exports.MailService = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../errors/appError"));
const sendEmail_1 = require("../../utils/sendEmail");
const sendMailToAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sendEmail_1.sendEmail)(payload.email, payload);
        return null;
    }
    catch (err) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to send email");
    }
});
exports.MailService = {
    sendMailToAdmin,
};
