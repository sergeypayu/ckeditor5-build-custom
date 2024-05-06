/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
declare class ClassicEditor extends ClassicEditorBase {
    static builtinPlugins: any[];
    static defaultConfig: EditorConfig;
}
declare class MarkdownEditor extends ClassicEditor {
    static builtinPlugins: any[];
}
declare const _default: {
    ClassicEditor: typeof ClassicEditor;
    MarkdownEditor: typeof MarkdownEditor;
};
export default _default;
