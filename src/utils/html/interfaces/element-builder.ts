import { WhenElementBuilder } from './when-element-builder';

export type ElementBuilder = {
    build(): HTMLElement;
    withClass(className: string, ...rest: string[]): ElementBuilder;
    withChild(child: HTMLElement, ...rest: HTMLElement[]): ElementBuilder;
    when(predicate: () => boolean): WhenElementBuilder;
};
