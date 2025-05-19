import { Plugin } from 'ckeditor5';
/**
 * The FileBrowser UI plugin. It introduces the `'fileBrowser'` toolbar button.
 *
 * @extends module:core/plugin~Plugin
 */
export default class FileBrowserUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "FileBrowserUI";
    /**
     * @inheritDoc
     */
    init(): void;
}
