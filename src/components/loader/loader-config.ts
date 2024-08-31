import { Blur } from '../../models/blur';
import { Speed } from '../../models/speed';
import { Size } from '../../models/size';
import { ComponentConfig } from '../../models/component-config';

export type LoaderConfig = ComponentConfig & { 
    size?: Size;
    pointerSpeed?: Speed;
    blur?: Blur;
    target?: HTMLElement;
}
