interface IHslaToRgbaResult {
    r: number;
    g: number;
    b: number;
    a: number;
}
export default function hslaToRgba(h: string | number | any, s: any, l: any, a?: number): IHslaToRgbaResult;
export {};
