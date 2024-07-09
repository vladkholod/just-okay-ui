export type ElementConfig = {
    tagName: keyof HTMLElementTagNameMap;
    classNames?: string[];
    children?: HTMLElement[];
};
