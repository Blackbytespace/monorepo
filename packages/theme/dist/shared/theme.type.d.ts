export type TThemeParameterOption = {
    label: string;
    value: string;
};
export type TThemePreviewsGenerate = {
    outDir: string;
    name: string;
    url: string;
    selector?: string;
    keepClasses?: string[];
};
export type TThemePreviewsServe = {
    url: string;
};
export type TThemePreviews = {
    generate?: TThemePreviewsGenerate;
    serve?: TThemePreviewsServe;
};
export type TThemeCombinations = {
    [key: string]: string[];
};
export type TThemeParameter = {
    id: string;
    name: string;
    default?: string;
    options: TThemeParameterOption[];
};
export type TThemeValues = {
    [key: string]: string;
};
export type TTheme = {
    name: string;
    description?: string;
    parameters: TThemeParameter[];
    previews?: TThemePreviews;
    combinations?: TThemeCombinations;
    values: TThemeValues;
};
