import { bem } from '@bqx/bem';
import { Block } from '@bqx/bem/dist/models/block';
import { Size } from '../../shared/models/size';
import { BlockModifiers } from './models';

export function getSizeBlockModifiers<BlockName extends string>(block: Block<BlockName>): BlockModifiers<Size, BlockName> { 
    return {
        xs: bem.blockModifier(block, 'xs'),
        sm: bem.blockModifier(block, 'sm'),
        md: bem.blockModifier(block, 'md'),
        lg: bem.blockModifier(block, 'lg'),
    } ;
}
