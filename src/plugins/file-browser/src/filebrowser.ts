import { Plugin } from '@ckeditor/ckeditor5-core/src';

import FileBrowserEditing from './filebrowserediting';
import FileBrowserUI from './filebrowserui';

export default class FileBrowser extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return [FileBrowserEditing, FileBrowserUI];
    }

    /**
     * @inheritDoc
     */
    public static get pluginName() {
        return 'FileBrowser' as const;
    }
}
