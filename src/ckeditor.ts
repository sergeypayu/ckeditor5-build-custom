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
import {
	Image,
	ImageCaption,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	PictureEditing
} from '@ckeditor/ckeditor5-image';
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

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class ClassicEditor extends ClassicEditorBase {
	public static override builtinPlugins: any[] = [
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
		TextTemplates,
		TextTransformation,
		Undo,
	];

	public static override defaultConfig: EditorConfig = {
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
				'mergeTableCells'
			]
		}
	};
}

class MarkdownEditor extends ClassicEditor {
	public static override builtinPlugins = [
		...super.builtinPlugins,
		Markdown
	]
}

export default {
	ClassicEditor, MarkdownEditor
};

