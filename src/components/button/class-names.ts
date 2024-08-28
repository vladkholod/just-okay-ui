import { bem } from '@bqx/bem';
import { getLibBlockName } from '../../utils/bem';
import { getSizeBlockModifiers } from '../../utils/bem/get-size-modifiers';
import { getVariantBlockModifiers } from '../../utils/bem/get-variant-modifiers';

const buttonBlock = bem.block(getLibBlockName('button'));

export const classNames = {
    button: {
        element: buttonBlock,
        modifiers: {
            size: getSizeBlockModifiers(buttonBlock),
            variant: getVariantBlockModifiers(buttonBlock),
            isIcon: bem.blockModifier(buttonBlock, 'icon'),
        },
        icon: {
            element: bem.element(buttonBlock, 'icon'),
        },
    },
} as const;
