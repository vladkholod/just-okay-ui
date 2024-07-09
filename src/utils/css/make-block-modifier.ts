import { Block } from './interfaces/block';
import { BlockModifier } from './interfaces/block-modifier';

export function makeBlockModifier<BlockName extends string, ModifierName extends string>(block: Block<BlockName>, modifierName: ModifierName): BlockModifier<BlockName, ModifierName> {
    const modifier = `${block}--${modifierName}`;

    return modifier as BlockModifier<BlockName, ModifierName>;
}
