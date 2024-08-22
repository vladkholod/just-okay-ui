import { LoaderConfig } from './loader-config';
import { classNames } from './class-names';
import { Disposable } from '../../shared/models/disposable';
import { DEFAULT_SIZE } from '../../shared/models/size';
import { DEFAULT_SPEED } from '../../shared/models/speed';
import { DEFAULT_BLUR } from '../../shared/models/blur';
import { eb } from '@bqx/html-element-builder';
import { Component } from '../component';

export class Loader implements Component, Disposable<void> {
    private readonly config: Required<LoaderConfig>;
    public readonly element: HTMLElement;

    private appended = false;
    private loading = false;
    private disposed = false;

    public constructor(config: LoaderConfig) {
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
            .when(() => config.pointerSpeed !== DEFAULT_SPEED)
            .withClass(classNames.loader.modifiers.pointerSpeed[config.pointerSpeed])
            .withChild(pointerElement)
            .build();

        const containerElement = eb('div')
            .withClass(
                classNames.loader.container.element,
                classNames.loader.container.modifiers.off,
            )
            .when(() => config.blur)
            .withClass(classNames.loader.container.modifiers.blur)
            .withChild(loaderElement)
            .build();

        return containerElement;
    }

    private static initConfig(config: LoaderConfig): Required<LoaderConfig> {
        const target = config.target ?? document.body;

        return {
            size: config.size ?? DEFAULT_SIZE,
            pointerSpeed: config.pointerSpeed ?? DEFAULT_SPEED,
            blur: config.blur ?? DEFAULT_BLUR,
            target,
        };
    }
}
