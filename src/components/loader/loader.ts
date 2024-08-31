import { LoaderConfig } from './loader-config';
import { classNames } from './class-names';
import { Disposable } from '../../models/disposable';
import { DEFAULT_SIZE } from '../../models/size';
import { DEFAULT_SPEED } from '../../models/speed';
import { DEFAULT_BLUR } from '../../models/blur';
import { eb } from '@bqx/html-element-builder';
import { Component } from '../../models/component';
import { idMatcher } from '../../utils/element-builder';

export class Loader implements Component, Disposable<void> {
    public readonly element: HTMLElement;

    private readonly config: Required<LoaderConfig>;

    private appended = false;
    private loading = false;
    private disposed = false;

    public constructor(config?: LoaderConfig) {
        this.config = Loader.initConfig(config);

        this.element = Loader.createDOM(this.config);
    }

    public on(): void {
        if (this.disposed) {
            return;
        }

        this.loading = !this.loading;

        if (!this.appended) {
            this.config.target.appendChild(this.element);

            this.appended = true;
        }

        this.element.classList.remove(classNames.loader.container.modifiers.off);
    }

    public off(): void {
        if (this.disposed) {
            return;
        }

        this.element.classList.add(classNames.loader.container.modifiers.off);
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }

        this.element.remove();

        this.disposed = true;
    }

    private static createDOM(config: Required<Omit<LoaderConfig, 'container'>>): HTMLElement {
        const pointerElement = eb('div')
            .withClass(classNames.loader.pointer.element)
            .build();

        const loaderElement = eb('div')
            .withClass(
                classNames.loader.element,
                classNames.loader.modifiers.size[config.size],
            )
            .match(
                () => config.pointerSpeed !== DEFAULT_SPEED,
                builder => builder.withClass(classNames.loader.modifiers.pointerSpeed[config.pointerSpeed]),
            )
            .withChild(pointerElement)
            .build();

        const containerElement = eb('div')
            .withClass(
                classNames.loader.container.element,
                classNames.loader.container.modifiers.off,
            )
            .match(...idMatcher(config.id))
            .match(
                () => config.blur,
                builder => builder.withClass(classNames.loader.container.modifiers.blur),
            )
            .withChild(loaderElement)
            .build();

        return containerElement;
    }

    private static initConfig(config?: LoaderConfig): Required<LoaderConfig> {
        return {
            id: config?.id ?? '',
            size: config?.size ?? DEFAULT_SIZE,
            pointerSpeed: config?.pointerSpeed ?? DEFAULT_SPEED,
            blur: config?.blur ?? DEFAULT_BLUR,
            target: config?.target ?? document.body,
        };
    }
}
