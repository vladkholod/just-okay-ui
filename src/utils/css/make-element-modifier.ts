import { Element } from './interfaces/element';
import { ElementModifier } from './interfaces/element-modifier';

export function makeElementModifier<
    BlockName extends string,
    ElementName extends string,
    ModifierName extends string
>(
    element: Element<BlockName, ElementName>,
    modifierName: ModifierName,
): ElementModifier<BlockName, ElementName, ModifierName> {
    const modifier = `${element}--${modifierName}`;

    return modifier as ElementModifier<BlockName, ElementName, ModifierName>;
}
