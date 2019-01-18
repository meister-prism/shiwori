// actionのtype一覧
// stateの全削除（ログアウトの処理）
export const CLEAR_STATE = 'CLEAR_STATE';

// action/user_data
// set
export const SET_USER_ID = 'SET_USER_ID';
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_PASS = 'SET_USER_PASS';
// set all
export const SET_USER_DATA = 'SET_USER_DATA';
// clear
export const CLEAR_USER_ID = 'CLEAR_USER_ID';
export const CLEAR_USER_NAME = 'CLEAR_USER_NAME';
export const CLEAR_USER_EMAIL = 'CLEAR_USER_EMAIL';
export const CLEAR_USER_PASS = 'CLEAR_USER_PASS';

// clear all
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';

// guest
export const GUEST_SET = 'GUEST_SET';
export const GUEST_CLEAR = 'GUEST_CLEAR';

// action/now_reading
export const SET_NOW_BOOK = 'SET_NOW_BOOK';
export const CLEAR_NOW_BOOK = 'CLEAR_NOW_BOOK';
export const ADD_NOW_BOOK = 'ADD_NOW_BOOK';
export const DELETE_NOW_BOOK = 'DELETE_NOW_BOOK';
export const START_NOW_BOOK = 'START_NOW_BOOK';
export const STOP_NOW_BOOK = 'STOP_NOW_BOOK';

// action/backup
export const CLEAR_BACKUP_DATA = 'CLEAR_BACKUP_DATA';
export const PUSH_BACKUP_DATA = 'PUSH_BACKUP_DATA';
export const PULL_BACKUP_DATA = 'PULL_BACKUP_DATA';