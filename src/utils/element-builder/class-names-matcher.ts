import { ElementBuilder } from '@bqx/html-element-builder';

export function classNamesMatcher(classNames: string): Parameters<ElementBuilder['match']> {
    return [
        () => classNames !== '',
        (builder: ElementBuilder) => builder.withClass(classNames),
    ];
}
