import { Blur } from '../../shared/models/blur';
import { Pace } from '../../shared/models/pace';
import { Size } from '../../shared/models/size';

export interface LoaderConfig { 
    size?: Size;
    pace?: Pace;
    blur?: Blur;
    container?: HTMLElement;
}
