import { DEFAULTS } from '../../constants/defaults';
import { Block } from './interfaces/block';

export function makeBlock<BlockName extends string>(blockName: BlockName): Block<BlockName> {
    const block = `${DEFAULTS.libPrefix}-${blockName}`;

    return block as Block<BlockName>;
}
