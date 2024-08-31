import { ElementBuilder } from '@bqx/html-element-builder';

export function idMatcher(id: string): Parameters<ElementBuilder['match']> {
    return [
        () => id === '',
        (builder: ElementBuilder) =>
            builder.withRawTransformation((element) => element.id = id),
    ];
}
