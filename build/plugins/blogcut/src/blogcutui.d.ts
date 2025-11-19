import { Plugin } from 'ckeditor5';
import '../theme/blogcut.css';
/**
 * The BlogcutUI UI plugin. It introduces the `'blogcut'` toolbar button.
 *
 * @extends module:core/plugin~Plugin
 */
export default class BlogcutUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "BlogcutUI";
    /**
     * @inheritDoc
     */
    init(): void;
}
