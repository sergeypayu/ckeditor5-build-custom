/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { ClassicEditor as ClassicEditorBase, Autoformat, Bold, Code, Italic, Strikethrough, BlockQuote, CloudServices, EasyImage, Essentials, Heading, Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar, ImageUpload, PictureEditing, Indent, Link, List, Markdown, MediaEmbed, Paragraph, PasteFromOffice, RemoveFormat, SimpleUploadAdapter, SourceEditing, SpecialCharacters, SpecialCharactersEssentials, Table, TableCellProperties, TableProperties, TableToolbar, TextTransformation, Undo } from 'ckeditor5';
import { FileBrowser } from './plugins/file-browser/src';
import { TextTemplates } from './plugins/text-templates/src';
import { LinkName } from './plugins/link-name/src';
import 'ckeditor5/ckeditor5.css';
declare class ClassicEditor extends ClassicEditorBase {
    static builtinPlugins: (typeof SimpleUploadAdapter | typeof TextTransformation | typeof Autoformat | typeof Bold | typeof Code | typeof Italic | typeof Strikethrough | typeof BlockQuote | typeof CloudServices | typeof EasyImage | typeof Undo | typeof Essentials | typeof Paragraph | typeof Heading | typeof Image | typeof ImageCaption | typeof ImageResize | typeof ImageStyle | typeof ImageToolbar | typeof ImageUpload | typeof Indent | typeof Link | typeof List | typeof MediaEmbed | typeof PasteFromOffice | typeof RemoveFormat | typeof SourceEditing | typeof SpecialCharacters | typeof SpecialCharactersEssentials | typeof Table | typeof TableCellProperties | typeof TableProperties | typeof TableToolbar | typeof FileBrowser | typeof TextTemplates | typeof LinkName | typeof PictureEditing)[];
    static defaultConfig: {
        toolbar: {
            items: string[];
        };
        language: string;
        translations: any[];
        image: {
            toolbar: string[];
        };
        table: {
            contentToolbar: string[];
            tableProperties: {};
            tableCellProperties: {};
        };
    };
}
declare class MarkdownEditor extends ClassicEditorBase {
    static builtinPlugins: (typeof TextTransformation | typeof Autoformat | typeof Bold | typeof Italic | typeof Undo | typeof Essentials | typeof Paragraph | typeof Link | typeof Markdown | typeof PasteFromOffice | typeof RemoveFormat | typeof SourceEditing | typeof TextTemplates)[];
    static defaultConfig: {
        toolbar: {
            items: string[];
        };
        language: string;
    };
}
declare const _default: {
    ClassicEditor: typeof ClassicEditor;
    MarkdownEditor: typeof MarkdownEditor;
};
export default _default;
