import { Content } from '../../models/content';
import { Size } from '../../models/size';

export interface ModalContent {
    main: Content;
    title?: Content;
    footer?: Content;
}

export interface ModalConfig {
    content: ModalContent;
    size?: Size;
    fullScreen?: boolean;
    blur?: boolean;
    closeOnOutsideClick?: boolean;
    destroyOnClose?: boolean;
}
