import StatusCode from './StatusCode';

export default {
  // Success
  [StatusCode.SUCCESS]: 'Success',
  
  // General errors
  [StatusCode.DATA_NOT_FOUND]: 'Data Not Found',
  [StatusCode.INVALID_PARAMETER]: 'Invalid Parameter',
  [StatusCode.UNAUTHROIZED]: 'Unauthorized Access',
  [StatusCode.FORBIDDEN]: 'Access Forbidden',
  [StatusCode.INVALID_REFRESH_TOKEN]: 'Invalid Refresh Token',
  [StatusCode.USER_NO_COOLDOWN_YET]: 'Please wait for {cooldownRemainder} seconds',

  // IAM related errors
  [StatusCode.EMAIL_ALREADY_EXISTS]: 'Email Already Exists',
  [StatusCode.SOME_POLICY_NOT_FOUND]: 'Policy Not Found',
  [StatusCode.SOME_ACTION_NOT_FOUND]: 'Action Not Found',
  [StatusCode.USER_ALREADY_ACTIVATED]: 'User Already Activated',
  [StatusCode.CANNOT_MODIFY_DEFAULT_POLICY]: 'Cannot Modify Default Policy',
  [StatusCode.USER_TOKEN_NOT_FOUND]: 'User Token Not Found',
  [StatusCode.USER_TOKEN_EXPIRED]: 'User Token Expired',
  [StatusCode.USER_NOT_FOUND]: 'User Not Found',
  [StatusCode.INVALID_CREDENTIALS]: 'Invalid Credentials',
  [StatusCode.USER_NOT_ACTIVATED]: 'User Not Activated',
  [StatusCode.INVALID_PASSWORD]: 'Invalid Password',

  // Email errors
  [StatusCode.SEND_EMAIL_FAILED]: 'Failed to Send Email',

  // Movie management errors
  [StatusCode.MOVIE_NOT_FOUND]: 'Movie Not Found',
  [StatusCode.MOVIE_SLUG_EXISTS]: 'Movie with this slug already exists',
  [StatusCode.EPISODE_NOT_FOUND]: 'Episode Not Found',
  [StatusCode.EPISODE_ORDER_EXISTS]: 'Episode with this order already exists for this movie',
  [StatusCode.GENRE_NOT_FOUND]: 'Genre Not Found',
  [StatusCode.GENRE_SLUG_EXISTS]: 'Genre with this slug already exists',
  [StatusCode.COUNTRY_NOT_FOUND]: 'Country Not Found',
  [StatusCode.COUNTRY_SLUG_EXISTS]: 'Country with this slug already exists',
  [StatusCode.CATEGORY_NOT_FOUND]: 'Category Not Found',
  [StatusCode.CATEGORY_SLUG_EXISTS]: 'Category with this slug already exists',

  // Internal errors
  [StatusCode.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
};
