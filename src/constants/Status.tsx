export const STATUS = {
    ACTIVE: "Đang hoạt động" as const,
    INACTIVE: "Ngừng hoạt động" as const,
};

export type StatusKeys = keyof typeof STATUS;




