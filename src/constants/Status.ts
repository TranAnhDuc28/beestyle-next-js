export const STATUS = {
    ACTIVE: "Hoạt động" as const,
    INACTIVE: "Ngừng hoạt động" as const,
};

export type StatusKeys = keyof typeof STATUS;
