import { View } from 'ckeditor5/src/ui';

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
                    'ck-texttemplates-empty'
                ]
            }
        });
    }
}