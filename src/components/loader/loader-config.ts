import { Blur } from '../../models/blur';
import { Speed } from '../../models/speed';
import { Size } from '../../models/size';

export interface LoaderConfig { 
    size?: Size;
    pointerSpeed?: Speed;
    blur?: Blur;
    target?: HTMLElement;
}
