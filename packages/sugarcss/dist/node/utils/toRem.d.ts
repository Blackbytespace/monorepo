export type TAstToken = {
    type: string;
    value: {
        unit: string;
        value: number;
        type?: string;
    };
};
export default function toRem<T>(astToken: T): T extends number ? number : TAstToken;
