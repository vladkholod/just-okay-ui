import { bem } from '@bqx/bem';
import { Block } from '@bqx/bem/dist/models/block';
import { BlockModifiers } from './models';
import { Pace } from '../../shared/models/pace';

export function getPaceBlockModifiers<BlockName extends string>(block: Block<BlockName>): BlockModifiers<Pace, BlockName> {
    return {
        slow: bem.blockModifier(block, 'slow'),
        regular: bem.blockModifier(block, 'regular'),
        fast: bem.blockModifier(block, 'fast'),
    };
}
