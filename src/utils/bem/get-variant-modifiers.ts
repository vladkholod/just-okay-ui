import { bem } from '@bqx/bem';
import { Block } from '@bqx/bem/dist/models/block';
import { Variant } from '../../models/variant';
import { BlockModifiers } from './models';

export function getVariantBlockModifiers<BlockName extends string>(block: Block<BlockName>): BlockModifiers<Variant, BlockName> { 
    return {
        primary: bem.blockModifier(block, 'primary'),
        secondary: bem.blockModifier(block, 'secondary'),
        tertiary: bem.blockModifier(block, 'tertiary'),
    } ;
}
