interface IHexToToRbaResult {
    r: number;
    g: number;
    b: number;
    a: number;
}
export default function hexToRgba(hex: string): IHexToToRbaResult;
export {};
