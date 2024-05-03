export default class FileBrowser extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): (typeof FileBrowserEditing | typeof FileBrowserUI)[];
    /**
     * @inheritDoc
     */
    static get pluginName(): string;
}
import { Plugin } from '@ckeditor/ckeditor5-core/src';
import FileBrowserEditing from './filebrowserediting';
import FileBrowserUI from './filebrowserui';
