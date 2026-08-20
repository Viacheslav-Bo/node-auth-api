import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { FIFTEEN_MINUTES, TWO_WEEKS } from "../constants/cookiesSesionLife.js";
import { Session } from "../models/sessionModel.js";

type AuthUser = {
	_id: Types.ObjectId;
	role: string;
};

export const createAuthTokens = (user: AuthUser) => {
	const accessSecret = process.env.JWT_SECRET;
	const refreshSecret = process.env.JWT_REFRESH_SECRET;

	if (!accessSecret || !refreshSecret) {
		throw createHttpError(500, "JWT secrets are not configured");
	}

	const accessToken = jwt.sign(
		{ id: user._id.toString(), role: user.role },
		accessSecret,
		{
			expiresIn: (process.env.JWT_EXPIRES_IN ??
				FIFTEEN_MINUTES) as jwt.SignOptions["expiresIn"],
		},
	);

	const refreshToken = jwt.sign({ id: user._id.toString() }, refreshSecret, {
		expiresIn: TWO_WEEKS,
	} as jwt.SignOptions);

	return { accessToken, refreshToken };
};

export const createAuthSession = async (user: AuthUser) => {
	const { accessToken, refreshToken } = createAuthTokens(user);
	const session = await Session.create({
		userId: user._id,
		refreshToken,
		refreshTokenValidUntil: new Date(Date.now() + TWO_WEEKS),
	});

	return {
		_id: session._id,
		accessToken,
		refreshToken,
	};
};
