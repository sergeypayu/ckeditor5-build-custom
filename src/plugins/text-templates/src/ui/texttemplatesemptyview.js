import { View } from '@ckeditor/ckeditor5-ui';

import '@ckeditor/ckeditor5-ui/theme/components/responsive-form/responsiveform.css';
import '../../theme/texttemplatesemptyview.css';

export default class TextTemplatesEmptyView extends View {
    constructor(locale) {
        super(locale);

        this.setTemplate({
            tag: 'div',
            children: [
                {
                    tag: 'span',
                    children: [
                        {
                            text: 'Нет шаблонов'
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
