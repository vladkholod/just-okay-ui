import { Block } from './block';

export type BlockModifier<BlockName extends string, ModifierName extends string> = `${Block<BlockName>}--${ModifierName}`;
