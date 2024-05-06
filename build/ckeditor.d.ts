/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Code, Italic, Strikethrough } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { EasyImage } from '@ckeditor/ckeditor5-easy-image';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar, ImageUpload, PictureEditing } from '@ckeditor/ckeditor5-image';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { Markdown } from '@ckeditor/ckeditor5-markdown-gfm';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format';
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import { SpecialCharacters, SpecialCharactersEssentials } from '@ckeditor/ckeditor5-special-characters';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { Undo } from '@ckeditor/ckeditor5-undo';
import { FileBrowser } from './plugins/file-browser/src';
import { TextTemplates } from './plugins/text-templates/src';
declare class ClassicEditor extends ClassicEditorBase {
    static builtinPlugins: ((typeof Autoformat) | typeof BlockQuote | typeof Bold | typeof Code | typeof CloudServices | typeof Essentials | typeof EasyImage | typeof FileBrowser | typeof Heading | typeof Image | typeof ImageCaption | typeof ImageResize | typeof ImageStyle | typeof ImageToolbar | typeof ImageUpload | typeof Indent | typeof Italic | typeof Link | typeof List | typeof MediaEmbed | typeof Paragraph | typeof PasteFromOffice | typeof PictureEditing | typeof RemoveFormat | typeof SourceEditing | typeof SpecialCharacters | typeof SpecialCharactersEssentials | typeof SimpleUploadAdapter | typeof Strikethrough | typeof Table | typeof TableToolbar | typeof TextTemplates | typeof TextTransformation | typeof Undo)[];
    static defaultConfig: EditorConfig;
}
declare class MarkdownEditor extends ClassicEditorBase {
    static builtinPlugins: (typeof Autoformat | typeof Bold | typeof Essentials | typeof Italic | typeof Link | typeof Paragraph | typeof PasteFromOffice | typeof RemoveFormat | typeof SourceEditing | typeof TextTemplates | typeof TextTransformation | typeof Undo | typeof Markdown)[];
    static defaultConfig: EditorConfig;
}
declare const _default: {
    ClassicEditor: typeof ClassicEditor;
    MarkdownEditor: typeof MarkdownEditor;
};
export default _default;
