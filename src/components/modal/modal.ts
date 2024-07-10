import { DEFAULT_BLUR } from '../../shared/models/blur';
import { Disposable } from '../../shared/models/disposable';
import { DEFAULT_SIZE } from '../../shared/models/size';
import { eb } from '../../utils/html';
import { classNames } from './class-names';
import { ModalConfig } from './modal-config';

export class Modal implements Disposable<void> {
    private readonly config: Required<ModalConfig>;
    private readonly container: HTMLElement;
    private readonly cross: HTMLElement;

    private appended = false;
    private shown = false;
    private disposed = false;

    constructor(config?: ModalConfig) {
        this.config = Modal.initConfig(config);

        const { container, cross } = Modal.createContainer(this.config);
        this.container = container;
        this.cross = cross;
    }

    public show(): void {
        if (this.disposed) {
            return;
        }

        if (this.shown) { 
            return;
        }

        this.shown = true;

        if (!this.appended) {
            document.body.appendChild(this.container);

            this.appended = true;
        }

        this.container.classList.remove(classNames.modal.modifiers.hidden);
    }

    public close(): void {
        if (this.disposed) {
            return;
        }

        if (!this.shown) { 
            return;
        }

        this.shown = false;

        this.container.classList.add(classNames.modal.modifiers.hidden);

        if (this.config.destroyOnClose) {
            this.dispose();
        }
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }

        this.container.remove();
        
        // TODO: check if it is available without direct remove call
        this.cross.remove();

        this.disposed = true;
    }

    private static createContainer(config: Required<ModalConfig>): { container: HTMLElement, cross: HTMLElement } {
        const { title, main, footer } = config.content;

        const cross = eb('div')
            .withClass(classNames.modal.cross.element)
            .build();

        const container = eb('div')
            .withClass(classNames.modal.element)
            .withChild(cross)
            .when(() => title !== undefined)
            .withChild(title!)
            .when(() => main !== undefined)
            .withChild(main!)
            .when(() => footer !== undefined)
            .withChild(footer!)
            .build();

        return { container, cross };
    }

    private static initConfig(config: ModalConfig | undefined): Required<ModalConfig> {
        return {
            size: config?.size ?? DEFAULT_SIZE,
            blur: config?.blur ?? DEFAULT_BLUR,
            content: config?.content ?? {},
            destroyOnClose: config?.destroyOnClose ?? true,
        };
    }
}
