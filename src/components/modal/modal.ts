import { DEFAULT_BLUR } from '../../shared/models/blur';
import { Disposable } from '../../shared/models/disposable';
import { DEFAULT_SIZE } from '../../shared/models/size';
import { eb } from '@bqx/html-element-builder';
import { classNames } from './class-names';
import { ModalConfig } from './modal-config';
import { Component } from '../component';

export class Modal implements Component, Disposable<void> {
    public readonly element: HTMLElement;

    private readonly config: Required<ModalConfig>;
    private readonly closeElement: HTMLElement;

    private appended = false;
    private shown = false;
    private disposed = false;

    constructor(config: ModalConfig) {
        this.config = Modal.initConfig(config);

        const { overlay, close } = Modal.createDOM(this.config);
        this.element = overlay;
        this.closeElement = close;
        this.closeElement.addEventListener('click', () => this.close());
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
            document.body.appendChild(this.element);

            this.appended = true;
        }

        this.element.classList.remove(classNames.modal.modifiers.hidden);
    }

    public close(): void {
        if (this.disposed) {
            return;
        }

        if (!this.shown) {
            return;
        }

        this.shown = false;

        this.element.classList.add(classNames.modal.modifiers.hidden);

        if (this.config.destroyOnClose) {
            this.dispose();
        }
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }

        this.element.remove();
        this.closeElement.remove();

        this.disposed = true;
    }

    private static createDOM(config: Required<ModalConfig>): { overlay: HTMLElement, close: HTMLElement } {
        const close = eb('div')
            .withClass(classNames.modal.title.close.element)
            .build();

        const closeContainer = eb('div')
            .withClass(classNames.modal.title.close.container.element)
            .withChild(close)
            .build();

        const titleContent = eb('div')
            .withClass(classNames.modal.title.content.element)
            .match(
                () => config.content.title !== undefined,
                builder => builder.match(
                    () => typeof config.content.title === 'string',
                    (builder) => builder.withText(config.content.title as string),
                    (builder) => builder.withChild(config.content.title as HTMLElement),
                ),
            )
            .build();

        const title = eb('div')
            .withClass(classNames.modal.title.element)
            .withChild(titleContent, closeContainer)
            .build();

        const main = eb('div')
            .withClass(classNames.modal.main.element)
            .match(
                () => typeof config.content.main === 'string',
                (builder) => builder.withText(config.content.main as string),
                (builder) => builder.withChild(config.content.main as HTMLElement),
            )
            .build();

        const container = eb('div')
            .withClass(
                classNames.modal.element,
                classNames.modal.modifiers.size[config.size],
            )
            .match(
                () => config.fullScreen,
                (builder) => builder.withClass(classNames.modal.modifiers.fullScreen),
            )
            .withChild(title, main)
            .match(
                () => config.content.footer !== undefined,
                builder => builder.withChild(
                    eb('div')
                        .withClass(classNames.modal.footer.element)
                        .match(
                            () => typeof config.content.footer === 'string',
                            (builder) => builder.withText(config.content.footer as string),
                            (builder) => builder.withChild(config.content.footer as HTMLElement),
                        )
                        .build(),
                ),
            )
            .build();

        const overlay = eb('div')
            .withClass(classNames.modal.overlay.element)
            .match(
                () => config.blur,
                builder => builder.withClass(classNames.modal.overlay.modifiers.blur),
            )
            .withChild(container)
            .build();

        return { overlay: overlay, close };
    }

    private static initConfig(config: ModalConfig): Required<ModalConfig> {
        return {
            size: config.size ?? DEFAULT_SIZE,
            fullScreen: config.fullScreen ?? false,
            blur: config.blur ?? DEFAULT_BLUR,
            content: config.content,
            destroyOnClose: config.destroyOnClose ?? true,
        };
    }
}
