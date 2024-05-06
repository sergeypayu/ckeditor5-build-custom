import { View } from '@ckeditor/ckeditor5-ui';
import { type Locale } from '@ckeditor/ckeditor5-utils';

import '@ckeditor/ckeditor5-ui/theme/components/responsive-form/responsiveform.css';
import '../../theme/texttemplatesemptyview.css';

export default class TextTemplatesEmptyView extends View<HTMLDivElement> {
    constructor(locale: Locale) {
        super(locale);

        const t = locale.t;

        this.setTemplate({
            tag: 'div',
            children: [
                {
                    tag: 'span',
                    children: [
                        {
                            text: t('Немає шаблонів')
                        }
                    ]
                }
            ],
            attributes: {
                class: [
                    'ck',
                    'ck-texttemplates-empty',
                    'ck-responsive-form'
                ]
            }
        });
    }

    public focus(): void {
        // не робимо нічого, це треба щоб уникнути ui-dropdown-panel-focus-child-missing-focus помилки
    }
}
