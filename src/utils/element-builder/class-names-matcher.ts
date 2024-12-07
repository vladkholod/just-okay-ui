/* eslint-disable @typescript-eslint/no-explicit-any */

import { ElementBuilder } from '@bqx/html-element-builder';

export function classNamesMatcher(classNames: string): Parameters<ElementBuilder<any>['match']> {
    return [
        () => classNames !== '',
        (builder: ElementBuilder<any>) => builder.withClass(classNames),
    ];
}
