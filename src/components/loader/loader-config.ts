import { Blur } from '../../shared/models/blur';
import { Speed } from '../../shared/models/speed';
import { Size } from '../../shared/models/size';

export interface LoaderConfig { 
    size?: Size;
    pointerSpeed?: Speed;
    blur?: Blur;
    target?: HTMLElement;
}
