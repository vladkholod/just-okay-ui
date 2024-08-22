import { BlockModifier } from '@bqx/bem/dist/models/block-modifier';

export type BlockModifiers<ModifierType extends string, BlockName extends string> = {
    [Key in ModifierType]: BlockModifier<BlockName, Key>;
};
