import { block, blockModifier } from '../../utils/css';

const modalBlock = block('modal');

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
        },
    },
} as const;
