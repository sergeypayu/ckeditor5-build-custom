import { Plugin } from 'ckeditor5';
import { ButtonView } from 'ckeditor5';

import { getSelectedBlogcut } from './helper';

import blogcutIcon from '../theme/icons/blogcut.svg';
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
    public static get pluginName() {
        return 'BlogcutUI' as const;
    }

    /**
     * @inheritDoc
     */
    public init(): void {
        const editor = this.editor;
        const componentFactory = editor.ui.componentFactory;
        const t = editor.t;

        componentFactory.add('blogcut', locale => {
            const command = editor.commands.get('insertBlogcut')!;
            const button = new ButtonView(locale);

            button.set({
                label: t('Вставити обрізання'),
                icon: blogcutIcon,
                tooltip: true
            });

            button.bind('isEnabled').to(command);

            button.on('execute', () => {
                const current = getSelectedBlogcut(editor);
                const currentText = current ? (current.getAttribute('text') as string) || '' : '';
                console.log(currentText, current);
                // Minimal UI: prompt for text; replace with a proper form if you prefer.
                const text = window.prompt('Blogcut text:', currentText);
                if (text === null) return; // canceled
                if (current) {
                    editor.execute('insertBlogcut', { text, replace: true });
                } else {
                    editor.execute('insertBlogcut', { text });
                }
            });

            return button;
        });
    }
}

