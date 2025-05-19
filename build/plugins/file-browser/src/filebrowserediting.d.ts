import { Plugin } from 'ckeditor5';
import { Notification } from 'ckeditor5';
export default class FileBrowserEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "FileBrowserEditing";
    /**
     * @inheritDoc
     */
    static get requires(): (string | typeof Notification)[];
    /**
     * @inheritDoc
     */
    init(): void;
}
