import { LoaderConfig } from './loader-config';
import { classNames } from './class-names';
import { Disposable } from '../../shared/models/disposable';
import { DEFAULT_SIZE } from '../../shared/models/size';
import { DEFAULT_PACE } from '../../shared/models/pace';
import { DEFAULT_BLUR } from '../../shared/models/blur';
import { eb } from '../../utils/html';

export class Loader implements Disposable<void> {
    private readonly config: Required<LoaderConfig>;
    private readonly wrapper: HTMLElement;

    private appended = false;
    private loading = false;
    private disposed = false;

    public constructor(config: LoaderConfig) {
        this.config = Loader.initConfig(config);

        this.wrapper = Loader.createContainer(this.config);
    }

    public on(): void {
        if (this.disposed) {
            return;
        }

        this.loading = !this.loading;

        if (!this.appended) {
            this.config.container.appendChild(this.wrapper);

            this.appended = true;
        }

        this.wrapper.classList.remove(classNames.loader.container.modifiers.off);
    }

    public off(): void {
        if (this.disposed) {
            return;
        }

        this.wrapper.classList.add(classNames.loader.container.modifiers.off);
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }

        this.wrapper.remove();

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
            .when(() => config.pace !== 'default')
            .withClass(classNames.loader.modifiers.duration[config.pace])
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
        const container = config.container ?? document.body;

        return {
            size: config.size ?? DEFAULT_SIZE,
            pace: config.pace ?? DEFAULT_PACE,
            blur: config.blur ?? DEFAULT_BLUR,
            container,
        };
    }
}
