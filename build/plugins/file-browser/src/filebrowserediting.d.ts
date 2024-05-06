import { Plugin } from '@ckeditor/ckeditor5-core/src';
import { Notification } from '@ckeditor/ckeditor5-ui/src';
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
