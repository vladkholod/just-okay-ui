import { Block } from './interfaces/block';
import { Element } from './interfaces/element';

export function makeElement<BlockName extends string, ElementName extends string>(block: Block<BlockName>, elementName: ElementName): Element<BlockName, ElementName> {
    const element = `${block}__${elementName}`;

    return element as Element<BlockName, ElementName>;
}
