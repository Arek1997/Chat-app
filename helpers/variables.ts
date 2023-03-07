export const NUMBERS_ARR = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
export const SPECIAL_CHARACTERS = ['!', '@', '#', '$', '%', '^', '&', '*'];

export const SMALL_LETTERS = /[a-z]/;
export const BIG_LETTERS = /[A-Z]/;
export const NAME_REG_EXP = /[A-Za-z]{3}/;
export const EMAIL_REG_EXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const PASSWORD_REG_EXP =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/gm;
export const PASSWORD_MIN_LENGTH = 8;

export const AVAILABLE_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp'];
export const MAX_IMAGE_SIZE_IN_MB = 1;
