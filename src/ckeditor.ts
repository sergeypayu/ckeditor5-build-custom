/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import {
    ClassicEditor as ClassicEditorBase,
    Autoformat,
    Bold,
    Code,
    Italic,
    Strikethrough,
    BlockQuote,
    CloudServices,
    EasyImage,
    Essentials,
    Heading,
    Image,
    ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    PictureEditing,
    Indent,
    Link,
    List,
    Markdown,
    MediaEmbed,
    Paragraph,
    PasteFromOffice,
    RemoveFormat,
    SimpleUploadAdapter,
    SourceEditing,
    SpecialCharacters,
    SpecialCharactersEssentials,
    Table,
    TableCellProperties,
    TableProperties,
    TableToolbar,
    TextTransformation,
    Undo
} from 'ckeditor5';

// @ts-expect-error
import coreTranslations from 'ckeditor5/translations/uk';

import { FileBrowser } from './plugins/file-browser/src';
import { TextTemplates } from './plugins/text-templates/src';
import { LinkName } from './plugins/link-name/src';

import 'ckeditor5/ckeditor5.css';

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class ClassicEditor extends ClassicEditorBase {
    public static override builtinPlugins = [
        Autoformat,
        BlockQuote,
        Bold,
        Code,
        CloudServices,
        Essentials,
        EasyImage,
        FileBrowser,
        Heading,
        Image,
        ImageCaption,
        ImageResize,
        ImageStyle,
        ImageToolbar,
        ImageUpload,
        Indent,
        Italic,
        Link,
        LinkName,
        List,
        MediaEmbed,
        Paragraph,
        PasteFromOffice,
        PictureEditing,
        RemoveFormat,
        SourceEditing,
        SpecialCharacters,
        SpecialCharactersEssentials,
        SimpleUploadAdapter,
        Strikethrough,
        Table,
        TableToolbar,
        TableProperties,
        TableCellProperties,
        TextTemplates,
        TextTransformation,
        Undo,
    ];

    public static override defaultConfig = {
        toolbar: {
            items: [
                'heading',
                '|',
                'removeFormat',
                'bold',
                'italic',
                'specialCharacters',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent',
                '|',
                'uploadImage',
                'fileBrowser',
                'blockQuote',
                'textTemplates',
                'insertTable',
                'mediaEmbed',
                'undo',
                'redo',
                '|',
                'sourceEditing',
            ]
        },
        language: 'uk',
        translations: [
            coreTranslations,
        ],
        image: {
            toolbar: [
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side',
                '|',
                'imageTextAlternative',
                'toggleImageCaption',
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells',
                'tableProperties',
                'tableCellProperties',
            ],
            tableProperties: {
                // The configuration of the TableProperties plugin.
            },
            tableCellProperties: {
                // The configuration of the TableCellProperties plugin.
            }
        },
    };
}

class MarkdownEditor extends ClassicEditorBase {
    public static override builtinPlugins = [
        Autoformat,
        Bold,
        Essentials,
        Italic,
        Link,
        Paragraph,
        PasteFromOffice,
        RemoveFormat,
        SourceEditing,
        TextTemplates,
        TextTransformation,
        Undo,
        Markdown
    ];

    public static override defaultConfig = {
        toolbar: {
            items: [
                'removeFormat',
                'bold',
                'italic',
                'link',
                '|',
                'undo',
                'redo',
                '|',
                'sourceEditing',
            ]
        },
        language: 'uk'
    };
}

export default {
    ClassicEditor, MarkdownEditor
};
