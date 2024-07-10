import { block, blockModifier, element } from '../../utils/css';

const modalBlock = block('modal');
const crossElement = element(modalBlock, 'cross');

export const classNames = {
    modal: {
        element: modalBlock,
        modifiers: {
            size: {
                xs: blockModifier(modalBlock, 'xs'),
                sm: blockModifier(modalBlock, 'sm'),
                md: blockModifier(modalBlock, 'md'),
                lg: blockModifier(modalBlock, 'lg'),
            },
            hidden: blockModifier(modalBlock, 'hidden'),
        },
        cross: {
            element: crossElement,
        },
    },
} as const;
