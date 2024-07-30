/* eslint-disable @typescript-eslint/no-unused-vars */
import '../src/styles/main.scss';

import { Loader } from '../src/components/loader';
import { Modal } from '../src/components/modal';
import { eb } from '@bqx/html-element-builder';

(() => {
    const app = document.getElementById('app');
    if (!app) {
        console.error('app element is not found');
        return;
    }

    app.innerText = '';

    new Modal({
        size: 'md',
        blur: true,
        destroyOnClose: false,
    }).show();

    // setInterval(() => modal.show(), 1_000);
    // setInterval(() => modal.close(), 2_000);
})();
