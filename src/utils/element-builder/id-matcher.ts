/* eslint-disable @typescript-eslint/no-explicit-any */

import { ElementBuilder } from '@bqx/html-element-builder';

export function idMatcher(id: string): Parameters<ElementBuilder<any>['match']> {
    return [
        () => id !== '',
        (builder: ElementBuilder<any>) =>
            builder.withRawTransformation((element) => element.id = id),
    ];
}
