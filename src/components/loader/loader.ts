import { LoaderConfig } from './loader-config';
import { classNames } from './class-names';
import { Disposable } from '../../shared/models/disposable';
import { DEFAULT_SIZE } from '../../shared/models/size';
import { DEFAULT_PACE } from '../../shared/models/pace';
import { DEFAULT_BLUR } from '../../shared/models/blur';
import { eb } from '@bqx/html-element-builder';

export class Loader implements Disposable<void> {
    private readonly config: Required<LoaderConfig>;
    private readonly container: HTMLElement;

    private appended = false;
    private loading = false;
    private disposed = false;

    public constructor(config: LoaderConfig) {
        this.config = Loader.initConfig(config);

        this.container = Loader.createContainer(this.config);
    }

    public on(): void {
        if (this.disposed) {
            return;
        }

        this.loading = !this.loading;

        if (!this.appended) {
            this.config.target.appendChild(this.container);

            this.appended = true;
        }

        this.container.classList.remove(classNames.loader.container.modifiers.hidden);
    }

    public off(): void {
        if (this.disposed) {
            return;
        }

        this.container.classList.add(classNames.loader.container.modifiers.hidden);
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }

        this.container.remove();

        this.disposed = true;
    }

    private static createContainer(config: Required<Omit<LoaderConfig, 'container'>>): HTMLElement {
        const pointerElement = eb('div')
            .withClass(classNames.loader.pointer.element)
            .build();

        const loaderElement = eb('div')
            .withClass(
                classNames.loader.element,
                classNames.loader.modifiers.size[config.size],
            )
            .when(() => config.pace !== 'regular')
            .withClass(classNames.loader.modifiers.pace[config.pace])
            .withChild(pointerElement)
            .build();

        const containerElement = eb('div')
            .withClass(classNames.loader.container.element)
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
            pace: config.pace ?? DEFAULT_PACE,
            blur: config.blur ?? DEFAULT_BLUR,
            target,
        };
    }
}
