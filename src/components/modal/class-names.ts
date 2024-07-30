import { bem } from '@bqx/bem';
import { getLibBlockName } from '../../utils/bem';

const modalBlock = bem.block(getLibBlockName('modal'));
const crossElement = bem.element(modalBlock, 'cross');

export const classNames = {
    modal: {
        element: modalBlock,
        modifiers: {
            size: {
                xs: bem.blockModifier(modalBlock, 'xs'),
                sm: bem.blockModifier(modalBlock, 'sm'),
                md: bem.blockModifier(modalBlock, 'md'),
                lg: bem.blockModifier(modalBlock, 'lg'),
            },
            hidden: bem.blockModifier(modalBlock, 'hidden'),
            blur: bem.blockModifier(modalBlock, 'blur'),
        },
        cross: {
            element: crossElement,
        },
    },
} as const;
