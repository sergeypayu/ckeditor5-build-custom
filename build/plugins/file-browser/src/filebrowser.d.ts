import { Plugin } from 'ckeditor5';
import FileBrowserEditing from './filebrowserediting';
import FileBrowserUI from './filebrowserui';
export default class FileBrowser extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): (typeof FileBrowserUI | typeof FileBrowserEditing)[];
    /**
     * @inheritDoc
     */
    static get pluginName(): "FileBrowser";
}
