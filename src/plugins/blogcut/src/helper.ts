import { Editor } from 'ckeditor5';

/**
 * Helper: return the selected blogcut element if the selection is on one
 * @param editor
 */
export function getSelectedBlogcut(editor: Editor) {
    const selection = editor.model.document.selection;
    const selectedElement = selection.getSelectedElement();
    if (selectedElement && selectedElement.name === 'blogcut') {
        return selectedElement;
    }
    // Also handle when cursor is inside the widget
    const posParent = selection?.getFirstPosition()?.parent;
    return posParent && posParent.name === 'blogcut' ? posParent : null;
}