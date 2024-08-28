import { Content } from '../../shared/models/content';
import { Size } from '../../shared/models/size';

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
