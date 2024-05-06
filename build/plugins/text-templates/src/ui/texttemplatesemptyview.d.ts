import { View } from '@ckeditor/ckeditor5-ui';
import { type Locale } from '@ckeditor/ckeditor5-utils';
import '@ckeditor/ckeditor5-ui/theme/components/responsive-form/responsiveform.css';
import '../../theme/texttemplatesemptyview.css';
export default class TextTemplatesEmptyView extends View<HTMLDivElement> {
    constructor(locale: Locale);
    focus(): void;
}
