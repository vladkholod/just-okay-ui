import { bem } from '@bqx/bem';
import { getLibBlockName, getSizeBlockModifiers, getVariantBlockModifiers } from '../../utils/bem';

const textfieldBlock = bem.block(getLibBlockName('textfield'));

export const classNames = {
    textfield: {
        element: textfieldBlock,
        modifiers: {
            fullWidth: bem.blockModifier(textfieldBlock, 'full-width'),
            size: getSizeBlockModifiers(textfieldBlock),
            variant: getVariantBlockModifiers(textfieldBlock),
        },
        container: {
            element: bem.element(textfieldBlock, 'container'),
        },
        label: {
            element: bem.element(textfieldBlock, 'label'),
        },
    },
} as const;
