/* eslint-disable @typescript-eslint/no-unused-vars */
import '../src/styles/main.scss';

import { Loader } from '../src/components/loader';
import { Modal } from '../src/components/modal';

(() => {
    const app = document.getElementById('app');
    if (!app) {
        console.error('app element is not found');
        return;
    }

    app.innerText = '';

    //new Loader({ size: 'lg', blur: true }).show();
    const title = document.createElement('div');
    title.style.width = '300px';
    title.style.aspectRatio = '1';
    title.style.backgroundColor = 'grey';
    const modal = new Modal({
        size: 'lg',
        content: {
            title,
        },
        destroyOnClose: false,
    });

    modal.show();
    setInterval(() => modal.show(), 1_000);
    setInterval(() => modal.close(), 2_000);
})();
