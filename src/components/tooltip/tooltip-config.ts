import { Speed } from '../../models/speed';
import { Size } from '../../models/size';
import { Position } from './models';
import { Content } from '../../models/content';
import { ComponentConfig } from '../../models/component-config';

export type TooltipConfig = ComponentConfig & {
    size?: Size;
    position?: Position;
    /**
     * Transition speed. Milliseconds for number.
     */
    transition?: Speed | number;
    target: HTMLElement;
    content: Content;
};
