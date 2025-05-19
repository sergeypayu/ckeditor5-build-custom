import {
    ButtonView,
    FocusCycler,
    InputTextView,
    LabeledFieldView,
    View,
    ViewCollection,
    createLabeledInputText,
    submitHandler,
    type FocusableView
} from 'ckeditor5';
import { FocusTracker, KeystrokeHandler, type Locale } from 'ckeditor5';
import { icons } from 'ckeditor5';

import '@ckeditor/ckeditor5-ui/theme/components/responsive-form/responsiveform.css';
import '../../theme/texttemplatesformview.css'

export default class TextTemplatesFormView extends View<HTMLFormElement> {
    /**
     * Tracks information about the DOM focus in the form.
     */
    public readonly focusTracker: FocusTracker;

    /**
     * An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
     */
    public readonly keystrokes: KeystrokeHandler;

    /**
     * An input with a label.
     */
    public nameInputView: LabeledFieldView<InputTextView>;

    /**
     * A button used to submit the form.
     */
    public saveButtonView: ButtonView;

    /**
     * A button used to cancel the form.
     */
    public cancelButtonView: ButtonView;

    /**
     * A collection of views which can be focused in the form.
     */
    protected readonly _focusables: ViewCollection<FocusableView>;

    /**
     * Helps cycling over focusable {@link #items} in the view.
     */
    protected readonly _focusCycler: FocusCycler;

    /**
     * An array of form validators used by {@link #isValid}.
     */
    private readonly _validators: Array<TextTemplatesFormValidatorCallback>;

    private _nameInputViewInfoDefault: string | undefined;
    private _nameInputViewInfoTip: string | undefined;

    declare public nameInputValue: string;

    constructor(locale: Locale, validators: Array<TextTemplatesFormValidatorCallback>) {
        super(locale);
        const t = locale.t;

        this.focusTracker = new FocusTracker();
        this.keystrokes = new KeystrokeHandler();

        this.set('nameInputValue', '');

        this.nameInputView = this._createLabeledInputView();

        this.saveButtonView = this._createButton(t('Save'), icons.check, 'ck-button-save');
        this.saveButtonView.type = 'submit';
        this.saveButtonView.bind('isEnabled').to(this, 'nameInputValue', value => !!value);

        this.cancelButtonView = this._createButton(t('Cancel'), icons.cancel, 'ck-button-cancel', 'cancel');

        this._focusables = new ViewCollection<FocusableView>();
        this._validators = validators;

        this._focusCycler = new FocusCycler({
            focusables: this._focusables,
            focusTracker: this.focusTracker,
            keystrokeHandler: this.keystrokes,
            actions: {
                // Navigate form fields backwards using the <kbd>Shift</kbd> + <kbd>Tab</kbd> keystroke.
                focusPrevious: 'shift + tab',

                // Navigate form fields forwards using the <kbd>Tab</kbd> key.
                focusNext: 'tab'
            }
        });

        this.setTemplate({
            tag: 'form',
            attributes: {
                class: [
                    'ck',
                    'ck-texttemplates-form',
                    'ck-responsive-form'
                ],
                tabindex: '-1'
            },
            children: [
                this.nameInputView,
                this.saveButtonView,
                this.cancelButtonView
            ],
        });
    }

    public override render(): void {
        super.render();

        this.keystrokes.listenTo(this.element!);

        submitHandler({ view: this });

        [
            this.nameInputView,
            this.saveButtonView,
            this.cancelButtonView
        ].forEach(v => {
            // Register the view as focusable.
            this._focusables.add(v);

            // Register the view in the focus tracker.
            this.focusTracker.add(v.element!);
        });


        const stopPropagation = (data: KeyboardEvent) => data.stopPropagation();

        this.keystrokes.set('arrowright', stopPropagation);
        this.keystrokes.set('arrowleft', stopPropagation);
        this.keystrokes.set('arrowup', stopPropagation);
        this.keystrokes.set('arrowdown', stopPropagation);

        this.listenTo(this.nameInputView.element!, 'selectstart', (evt, domEvt) => {
            domEvt.stopPropagation();
        }, { priority: 'high' });
    }

    public override destroy(): void {
        super.destroy();

        this.focusTracker.destroy();
        this.keystrokes.destroy();
    }

    public focus(): void {
        this._focusCycler.focusFirst();
    }

    public get name(): string {
        return this.nameInputView.fieldView.element!.value.trim();
    }

    public set name(name: string) {
        this.nameInputView.fieldView.element!.value = name.trim();
    }

    public isValid(): boolean {
        this.resetFormStatus();

        for (const validator of this._validators) {
            const errorText = validator(this);

            if (errorText) {
                this.nameInputView.errorText = errorText;

                return false;
            }
        }

        return true;
    }

    private _createLabeledInputView() {
        const t = this.locale!.t;

        const labeledInput = new LabeledFieldView(this.locale, createLabeledInputText);
        const inputField = labeledInput.fieldView;

        this._nameInputViewInfoDefault = t('Введіть назву шаблону.');
        this._nameInputViewInfoTip = t('Введіть назву шаблону');

        labeledInput.label = t('Назва шаблону');
        labeledInput.infoText = this._nameInputViewInfoDefault;

        inputField.on('input', () => {
            // Display the tip text only when there is some value. Otherwise fall back to the default info text.
            labeledInput.infoText = inputField.element!.value ? this._nameInputViewInfoTip! : this._nameInputViewInfoDefault!;
            this.nameInputValue = inputField.element!.value.trim();
        });

        return labeledInput;
    }

    /**
     * Creates the button view.
     *
     * @param label The button label
     * @param icon The button's icon.
     * @param className The additional button CSS class name.
     * @param eventName The event name that the ButtonView#execute event will be delegated to.
     * @returns The button view instance.
     */
    private _createButton(label: string, icon: string, className: string, eventName?: string): ButtonView {
        const button = new ButtonView(this.locale);

        button.set({
            label,
            icon,
            tooltip: true
        });

        button.extendTemplate({
            attributes: {
                class: className
            }
        });

        if (eventName) {
            button.delegate('execute').to(this, eventName);
        }

        return button;
    }

    /**
     * Cleans up the supplementary error and information text of the {@link #labeledInput}
     * bringing them back to the state when the form has been displayed for the first time.
     *
     * See {@link #isValid}.
     */
    public resetFormStatus(): void {
        this.nameInputView.errorText = null;
        this.nameInputView.infoText = this._nameInputViewInfoDefault || '';
    }
}

export type TextTemplatesFormValidatorCallback = (form: TextTemplatesFormView) => string | undefined;

/**
 * Fired when the form view is submitted (when one of the children triggered the submit event),
 * for example with a click on {@link ~TextTemplatesFormView#saveButtonView}.
 *
 * @eventName ~TextTemplatesFormView#submit
 */
export type SubmitEvent = {
    name: 'submit';
    args: [];
};

/**
 * Fired when the form view is canceled, for example with a click on {@link ~TextTemplatesFormView#cancelButtonView}.
 *
 * @eventName ~TextTemplatesFormView#cancel
 */
export type CancelEvent = {
    name: 'cancel';
    args: [];
};
