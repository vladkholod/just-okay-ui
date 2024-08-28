import { Speed } from '../../shared/models/speed';
import { Size } from '../../shared/models/size';
import { Position } from './models';
import { Content } from '../../shared/models/content';

export interface TooltipConfig {
    size?: Size;
    position?: Position;
    /**
     * Transition speed. Milliseconds for number.
     */
    transition?: Speed | number;
    target: HTMLElement;
    content: Content;
}
