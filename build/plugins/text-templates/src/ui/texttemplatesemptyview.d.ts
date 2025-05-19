import { View } from 'ckeditor5';
import { type Locale } from 'ckeditor5';
import '@ckeditor/ckeditor5-ui/theme/components/responsive-form/responsiveform.css';
import '../../theme/texttemplatesemptyview.css';
export default class TextTemplatesEmptyView extends View<HTMLDivElement> {
    constructor(locale: Locale);
    focus(): void;
}
