import { ElementBuilder } from '@bqx/html-element-builder';
import { Content } from '../../shared/models/content';

export function contentMatcher(content: Content): Parameters<ElementBuilder['match']> {
    return [
        () => typeof content === 'string',
        (builder: ElementBuilder) => builder.withText(content as string),
        (builder: ElementBuilder) => builder.withChild(content as HTMLElement),
    ];
}
