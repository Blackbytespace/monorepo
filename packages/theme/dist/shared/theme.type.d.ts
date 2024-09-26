export type TThemeParameterOption = {
    label: string;
    value: string;
};
export type TThemePreviewsGenerate = {
    name?: string;
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
export type TThemeConbinations = {
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
    combinations?: TThemeConbinations;
    values: TThemeValues;
};
