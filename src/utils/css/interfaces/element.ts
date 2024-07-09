import { Block } from './block';

export type Element<BlockName extends string, ElementName extends string> = `${Block<BlockName>}__${ElementName}`;
