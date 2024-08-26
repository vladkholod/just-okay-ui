import { Size } from '../../shared/models/size';

export interface ModalContent {
    main: HTMLElement | string;
    title?: HTMLElement | string;
    footer?: HTMLElement | string;
}

export interface ModalConfig {
    content: ModalContent;
    size?: Size;
    fullScreen?: boolean;
    blur?: boolean;
    destroyOnClose?: boolean;
}
