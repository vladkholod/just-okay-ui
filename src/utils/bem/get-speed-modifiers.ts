import { bem } from '@bqx/bem';
import { Block } from '@bqx/bem/dist/models/block';
import { BlockModifiers } from './models';
import { Speed } from '../../models/speed';

export function getSpeedBlockModifiers<BlockName extends string>(block: Block<BlockName>): BlockModifiers<Speed, BlockName> {
    return {
        slow: bem.blockModifier(block, 'slow'),
        regular: bem.blockModifier(block, 'regular'),
        fast: bem.blockModifier(block, 'fast'),
    };
}
