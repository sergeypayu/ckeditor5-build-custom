import { Plugin } from '@ckeditor/ckeditor5-core/src';
import { ButtonView } from '@ckeditor/ckeditor5-ui/src';

import browseFilesIcon from '../theme/icons/browse-files.svg';

/**
 * The FileBrowser UI plugin. It introduces the `'fileBrowser'` toolbar button.
 *
 * @extends module:core/plugin~Plugin
 */
export default class FileBrowserUI extends Plugin {
    /**
     * @inheritDoc
     */
    public static get pluginName(): string {
        return 'FileBrowserUI' as const;
    }

    /**
     * @inheritDoc
     */
    public init(): void {
        const editor = this.editor;
        const componentFactory = editor.ui.componentFactory;
        const t = editor.t;

        componentFactory.add('fileBrowser', locale => {
            const command = editor.commands.get('fileBrowser')!;

            const button = new ButtonView(locale);

            button.set({
                label: t('Вставити зображення чи файл'),
                icon: browseFilesIcon,
                tooltip: true
            });

            button.bind('isEnabled').to(command);

            button.on('execute', () => {
                editor.execute('fileBrowser');
                editor.editing.view.focus();
            });

            return button;
        });
    }
}
