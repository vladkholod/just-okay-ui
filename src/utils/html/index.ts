import { ElementBuilder } from './interfaces/element-builder';
import { DefaultElementBuilder } from './default-element-builder';

function elementBuilder(tagName: keyof HTMLElementTagNameMap): ElementBuilder { 
    return new DefaultElementBuilder(tagName);
}

export {
    DefaultElementBuilder as ElementBuilder,
    elementBuilder as eb,
};
