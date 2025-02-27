import { __generateIdFromForm, __querySelectorLive } from '@lotsof/sugar/dom';
export default function formTrackingEvents(settings) {
    const finalSettings = Object.assign({ lang: true, debug: false, simplifyLang: true }, (settings || {}));
    // @ts-ignore
    const dataLayer = window.dataLayer || [];
    const _log = (msg) => {
        if (!finalSettings.debug)
            return;
        console.info(`[FormTrackingEvents]: ${msg}`);
    };
    // get each forms in the page
    __querySelectorLive('form', ($form) => {
        var _a;
        // check if the form have an id or not
        // if not, create one based on the form attributes
        if (!$form.id) {
            const formId = __generateIdFromForm($form);
            $form.setAttribute('id', formId);
        }
        // get the language of the page
        let lang = (_a = document.documentElement.lang) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (finalSettings.simplifyLang) {
            lang = lang.split('-')[0];
        }
        // util log for SEO
        _log(`${$form.id} found`);
        // add event listener to the form
        // to track the form submission
        $form.addEventListener('submit', function () {
            if ($form.checkValidity() === false) {
                return;
            }
            if ($form.hasAttribute('submitted')) {
                return;
            }
            $form.setAttribute('submitted', 'true');
            dataLayer === null || dataLayer === void 0 ? void 0 : dataLayer.push({ event: `form.${$form.id}.submitted` });
            _log(`event: form.${$form.id}.submitted`);
            if (finalSettings.lang && lang) {
                dataLayer === null || dataLayer === void 0 ? void 0 : dataLayer.push({ event: `form.${$form.id}.${lang}.submitted` });
                _log(`event: form.${$form.id}.${lang}.submitted`);
            }
        });
        // check the form controls to track the form start
        const $formControls = $form.querySelectorAll('input, select, textarea');
        for (let [i, $formControl] of $formControls.entries()) {
            $formControl.addEventListener('keypress', function () {
                if ($form.hasAttribute('started')) {
                    return;
                }
                $form.setAttribute('started', 'true');
                dataLayer === null || dataLayer === void 0 ? void 0 : dataLayer.push({ event: `form.${$form.id}.started` });
                _log(`event: form.${$form.id}.started`);
                if (finalSettings.lang && lang) {
                    dataLayer === null || dataLayer === void 0 ? void 0 : dataLayer.push({ event: `form.${$form.id}.${lang}.started` });
                    _log(`event: form.${$form.id}.${lang}.started`);
                }
            });
        }
    });
}
//# sourceMappingURL=formTrackingEvents.js.map