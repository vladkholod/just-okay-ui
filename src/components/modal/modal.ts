import { DEFAULT_BLUR } from '../../models/blur';
import { Disposable } from '../../models/disposable';
import { DEFAULT_SIZE } from '../../models/size';
import { eb } from '@bqx/html-element-builder';
import { classNames } from './class-names';
import { ModalConfig } from './modal-config';
import { Component } from '../../models/component';
import { classNamesMatcher, idMatcher } from '../../utils/element-builder';
import { getInitComponentConfig } from '../../utils/get-init-component-config';
import { defaultCallback } from '../../models/default-callback';

export class Modal implements Component, Disposable<void> {
    public get element(): HTMLElement {
        return this.overlayElement;
    }

    private readonly config: Required<ModalConfig>;

    private readonly overlayElement: HTMLElement;
    private readonly modalElement: HTMLElement;
    private readonly closeElement: HTMLElement;

    private appended = false;
    private shown = false;
    private disposed = false;

    constructor(config: ModalConfig) {
        this.config = Modal.initConfig(config);

        const { overlay, modal, close } = Modal.createDOM(this.config);
        this.overlayElement = overlay;
        this.modalElement = modal;
        this.closeElement = close;

        this.initListeners();
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

        this.config.onClose();

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

    private initListeners(): void {
        this.closeElement.addEventListener('click', () => this.close());

        if (this.config.closeOnOutsideClick) {
            this.overlayElement.addEventListener('click', (event) => {
                if (event.target === this.overlayElement) {
                    this.close();
                }
            });
        }
    }

    private static createDOM(config: Required<ModalConfig>): { overlay: HTMLElement, modal: HTMLElement, close: HTMLElement } {
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

        const modal = eb('div')
            .withClass(
                classNames.modal.element,
                classNames.modal.modifiers.size[config.size],
            )
            .match(...idMatcher(config.id))
            .match(...classNamesMatcher(config.classNames))
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
            .withChild(modal)
            .build();

        return { overlay, modal, close };
    }

    private static initConfig(config: ModalConfig): Required<ModalConfig> {
        return {
            size: config.size ?? DEFAULT_SIZE,
            fullScreen: config.fullScreen ?? false,
            blur: config.blur ?? DEFAULT_BLUR,
            content: config.content,
            closeOnOutsideClick: config.closeOnOutsideClick ?? false,
            destroyOnClose: config.destroyOnClose ?? true,
            onClose: config.onClose ?? defaultCallback,
            ...getInitComponentConfig(config),
        };
    }
}
