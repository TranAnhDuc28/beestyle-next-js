export const STATUS = {
    ACTIVE: "Hoạt động",
    INACTIVE: "Ngừng hoạt động",
} as const;

export type StatusKeys = keyof typeof STATUS;
