export const GENDER = {
    MALE: "Nam",
    FEMALE: "Nữ" ,
    OTHER:"Khác"
} as const;

export const GENDER_KEYS = Object.keys(GENDER).filter(key => key === 'MALE' || key === 'FEMALE');



