import { Size } from '../../shared/models/size';

export interface ModalContent {
    title?: HTMLElement;
    main?: HTMLElement;
    footer?: HTMLElement;
}

export interface ModalConfig {
    content?: ModalContent;
    size?: Size;
    blur?: boolean;
    destroyOnClose?: boolean;
}
