import { View } from '@ckeditor/ckeditor5-ui';

import '@ckeditor/ckeditor5-ui/theme/components/responsive-form/responsiveform.css';
import '../../theme/texttemplatesemptyview.css';

export default class TextTemplatesEmptyView extends View {
    constructor(locale) {
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
}
