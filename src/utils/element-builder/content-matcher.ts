/* eslint-disable @typescript-eslint/no-explicit-any */

import { ElementBuilder } from '@bqx/html-element-builder';
import { Content } from '../../models/content';

export function contentMatcher(content: Content): Parameters<ElementBuilder<any>['match']> {
    return [
        () => typeof content === 'string',
        (builder: ElementBuilder<any>) => builder.withText(content as string),
        (builder: ElementBuilder<any>) => builder.withChild(content as HTMLElement),
    ];
}
