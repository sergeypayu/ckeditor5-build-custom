import {FocusTracker, KeystrokeHandler} from 'ckeditor5/src/utils';
import {
    View,
    createLabeledInputText,
    LabeledFieldView,
    ButtonView,
    submitHandler,
    ViewCollection
} from 'ckeditor5/src/ui';
import {icons} from 'ckeditor5/src/core';

import '../../theme/texttemplatesformview.css'

export default class TextTemplatesFormView extends View {
    constructor(validators, locale) {
        super(locale);

        const t = locale.t;

        this.focusTracker = new FocusTracker();

        this.keystrokes = new KeystrokeHandler();

        this.set('nameInputValue', '');

        this.nameInputView = this._createInput();

        this.saveButtonView = this._createButton(t('Save'), icons.check, 'ck-button-save');
        this.saveButtonView.type = 'submit';

        this.cancelButtonView = this._createButton(t('Cancel'), icons.cancel, 'ck-button-cancel', 'cancel');

        this._focusables = new ViewCollection();

        this._validators = validators;

        this.setTemplate({
            tag: 'form',
            children: [
                this.nameInputView,
                this.saveButtonView,
                this.cancelButtonView
            ],
            attributes: {
                class: [
                    'ck',
                    'ck-texttemplates-form'
                ]
            }
        });
    }

    render() {
        super.render();

        submitHandler({
            view: this
        });

        const childViews = [
            this.nameInputView,
            this.saveButtonView,
            this.cancelButtonView
        ];

        childViews.forEach(v => {
            this._focusables.add(v);

            this.focusTracker.add(v.element);
        });

        this.keystrokes.listenTo(this.element);

        const stopPropagation = data => data.stopPropagation();

        this.keystrokes.set('arrowright', stopPropagation);
        this.keystrokes.set('arrowleft', stopPropagation);
        this.keystrokes.set('arrowup', stopPropagation);
        this.keystrokes.set('arrowdown', stopPropagation);

        this.listenTo(this.nameInputView.element, 'selectstart', (evt, domEvt) => {
            domEvt.stopPropagation();
        }, {priority: 'high'});
    }

    get name() {
        return this.nameInputView.fieldView.element.value.trim();
    }

    set name(name) {
        this.nameInputView.fieldView.element.value = name.trim();
    }

    isValid() {
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

    _createInput() {
        const t = this.locale.t;

        const labeledInput = new LabeledFieldView(this.locale, createLabeledInputText);
        const inputField = labeledInput.fieldView;

        this._nameInputViewInfoDefault = t('Введите имя шаблона.');
        this._nameInputViewInfoTip = t('Введите имя шаблона');

        labeledInput.label = t('Имя шаблона');
        labeledInput.infoText = this._nameInputViewInfoDefault;

        inputField.on('input', () => {
            // Display the tip text only when there is some value. Otherwise fall back to the default info text.
            labeledInput.infoText = inputField.element.value ? this._nameInputViewInfoTip : this._nameInputViewInfoDefault;
            this.nameInputValue = inputField.element.value.trim();
        });

        return labeledInput;
    }

    _createButton(label, icon, className, eventName) {
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

    resetFormStatus() {
        this.nameInputView.errorText = null;
        this.nameInputView.infoText = this._nameInputViewInfoDefault;
    }
}