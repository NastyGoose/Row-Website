import actions from './userActionTypes';

const {
  VIEW_TESTS,
  ANSWER_TEST,
  DOWNLOAD_TESTS,
  RATE_TESTS,
  CREATEandCHANGE_TESTS,
  GET_OWN_PROFILE,
  GET_USER_PROFILE,
  VERIFY_TESTS,
  GET_PATCHES,
  DELETE_TESTS,
  DELETEandCREATEandRELEASE_PATCHES,
  ADDandDELETE_TESTS_IN_PATCH,
  UPandDOWNGRADE_USERS,
} = actions;

const guest = VIEW_TESTS | DOWNLOAD_TESTS;
const user = guest | ANSWER_TEST | RATE_TESTS | CREATEandCHANGE_TESTS | GET_OWN_PROFILE;
const moderator = user | GET_USER_PROFILE | VERIFY_TESTS | GET_PATCHES | DELETE_TESTS;
const admin = moderator
  | DELETEandCREATEandRELEASE_PATCHES
  | ADDandDELETE_TESTS_IN_PATCH
  | UPandDOWNGRADE_USERS;

export default {
  guest,
  user,
  moderator,
  admin,
};
