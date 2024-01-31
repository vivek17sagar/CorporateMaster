import { getAPIData, apiConfig } from "../../api/serviceConfig";

// ** Auth Endpoints
export default {
  loginEndpoint: `${getAPIData().url}/validatecorporatelogin`,
  registerEndpoint: "/jwt/register",
  refreshEndpoint: "/jwt/refresh-token",
  logoutEndpoint: "/jwt/logout",

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: "Bearer",

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: "tokenID",
  storageRefreshTokenKeyName: "refreshToken",
};
