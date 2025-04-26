import StatusCode from './StatusCode';
import httpCode from './HttpStatus';

export default {
  [StatusCode.SUCCESS]: httpCode.SUCCESS,
  [StatusCode.DATA_NOT_FOUND]: httpCode.NOT_FOUND,
  [StatusCode.INVALID_PARAMETER]: httpCode.BAD_REQUEST,
  [StatusCode.UNAUTHROIZED]: httpCode.UNAUTHORIZED,
  [StatusCode.FORBIDDEN]: httpCode.FORBIDDEN,
  [StatusCode.INVALID_REFRESH_TOKEN]: httpCode.UNAUTHORIZED,

  // IAM related errors
  [StatusCode.EMAIL_ALREADY_EXISTS]: httpCode.BAD_REQUEST,
  [StatusCode.SOME_POLICY_NOT_FOUND]: httpCode.NOT_FOUND,
  [StatusCode.SOME_ACTION_NOT_FOUND]: httpCode.NOT_FOUND,
  [StatusCode.USER_ALREADY_ACTIVATED]: httpCode.BAD_REQUEST,
  [StatusCode.CANNOT_MODIFY_DEFAULT_POLICY]: httpCode.FORBIDDEN,
  [StatusCode.USER_TOKEN_NOT_FOUND]: httpCode.NOT_FOUND,
  [StatusCode.USER_TOKEN_EXPIRED]: httpCode.UNAUTHORIZED,
  [StatusCode.USER_NOT_FOUND]: httpCode.NOT_FOUND,
  [StatusCode.INVALID_CREDENTIALS]: httpCode.UNAUTHORIZED,
  [StatusCode.USER_NOT_ACTIVATED]: httpCode.FORBIDDEN,
  [StatusCode.INVALID_PASSWORD]: httpCode.BAD_REQUEST,

  // Email errors
  [StatusCode.SEND_EMAIL_FAILED]: httpCode.INTERNAL_SERVER_ERROR,
  
  // Movie management related errors
  [StatusCode.MOVIE_NOT_FOUND]: httpCode.NOT_FOUND,
  [StatusCode.MOVIE_SLUG_EXISTS]: httpCode.BAD_REQUEST,
  [StatusCode.EPISODE_NOT_FOUND]: httpCode.NOT_FOUND,
  [StatusCode.EPISODE_ORDER_EXISTS]: httpCode.BAD_REQUEST,
  [StatusCode.GENRE_NOT_FOUND]: httpCode.NOT_FOUND,
  [StatusCode.GENRE_SLUG_EXISTS]: httpCode.BAD_REQUEST,
  [StatusCode.COUNTRY_NOT_FOUND]: httpCode.NOT_FOUND,
  [StatusCode.COUNTRY_SLUG_EXISTS]: httpCode.BAD_REQUEST,
  [StatusCode.CATEGORY_NOT_FOUND]: httpCode.NOT_FOUND,
  [StatusCode.CATEGORY_SLUG_EXISTS]: httpCode.BAD_REQUEST,
  
  // Internal errors
  [StatusCode.INTERNAL_SERVER_ERROR]: httpCode.INTERNAL_SERVER_ERROR,
};
