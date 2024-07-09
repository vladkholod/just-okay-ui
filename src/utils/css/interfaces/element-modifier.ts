import { Element } from './element';

export type ElementModifier<BlockName extends string, ElementName extends string, ModifierName extends string> = `${Element<BlockName, ElementName>}--${ModifierName}`;
