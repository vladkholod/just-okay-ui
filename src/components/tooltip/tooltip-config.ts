import { Speed } from '../../shared/models/speed';
import { Size } from '../../shared/models/size';
import { Position } from './models';

export interface TooltipConfig {
    size?: Size;
    position?: Position;
    /**
     * Transition speed. Milliseconds for number.
     */
    transition?: Speed | number;
    target: HTMLElement;
    content: HTMLElement | string;
}
