import { bem } from '@bqx/bem';
import { getLibBlockName, getSpeedBlockModifiers } from '../../utils/bem';
import { getSizeBlockModifiers } from '../../utils/bem/get-size-modifiers';

const tooltipBlock = bem.block(getLibBlockName('tooltip'));

export const classNames = {
    tooltip: {
        element: tooltipBlock,
        modifiers: {
            size: getSizeBlockModifiers(tooltipBlock),
            position: {
                top: bem.blockModifier(tooltipBlock, 'top'),
                right: bem.blockModifier(tooltipBlock, 'right'),
                bottom: bem.blockModifier(tooltipBlock, 'bottom'),
                left: bem.blockModifier(tooltipBlock, 'left'),
            },
            transitionSpeed: getSpeedBlockModifiers(tooltipBlock),
            off: bem.blockModifier(tooltipBlock, 'off'),
        },
    },
} as const;
