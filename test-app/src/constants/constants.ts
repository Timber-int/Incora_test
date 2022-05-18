export const UserRole = {
    USER: 'user',
    ADMIN: 'admin',
    MANAGER: 'manager',
};

export const TokenType = {
    ACCESS: 'ACCESS',
    REFRESH: 'REFRESH',
    ACTION: 'ACTION',
};

export const CONSTANTS = {
    AUTHORIZATION: 'Authorization',
    HASH_SALT: 15,
    DATA_BASE: 'testApp',
    PASSWORD_REGEXP: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})'),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    PHONE_REGEXP: new RegExp('^(\\s*)?(\\+)?([- _():=+]?\\d[- _():=+]?){10,14}(\\s*)?$'),
};
