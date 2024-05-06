import { Plugin } from '@ckeditor/ckeditor5-core/src';
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
