import { DEFAULT_BLUR } from '../../shared/models/blur';
import { Disposable } from '../../shared/models/disposable';
import { DEFAULT_SIZE } from '../../shared/models/size';
import { eb } from '../../utils/html';
import { classNames } from './class-names';
import { ModalConfig } from './modal-config';

export class Modal implements Disposable<void> {
    private readonly config: Required<ModalConfig>;
    private readonly element: HTMLElement;

    constructor(config?: ModalConfig) {
        this.config = Modal.initConfig(config);

        this.element = Modal.createElement(this.config);
    }

    public dispose(): void {
        return;
    }

    private static createElement(config: Required<ModalConfig>): HTMLElement {
        const { title, main, footer } = config.content;

        const containerElement = eb('div')
            .withClass(classNames.modal.element)
            .when(() => title !== undefined)
            .withChild(title)
            .when(() => main !== undefined)
            .withChild(main)
            .when(() => footer !== undefined)
            .withChild(footer)
            .build();

        return containerElement;
    }

    private static initConfig(config: ModalConfig | undefined): Required<ModalConfig> {
        return {
            size: config?.size ?? DEFAULT_SIZE,
            blur: config?.blur ?? DEFAULT_BLUR,
            content: config?.content ?? {},
        };
    }
}
