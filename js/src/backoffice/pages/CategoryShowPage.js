import AbstractShowPage from 'flamarkt/core/common/pages/AbstractShowPage';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Button from 'flarum/common/components/Button';

export default class CategoryShowPage extends AbstractShowPage {
    oninit(vnode) {
        this.category = null;
        this.saving = false;

        super.oninit(vnode);
    }

    newRecord() {
        return app.store.createRecord('flamarkt-categories');
    }

    findType() {
        return 'flamarkt/categories';
    }

    show(category) {
        this.category = category;
        this.title = category.title() || '';
        this.description = category.description() || '';

        app.setTitle(category.title());
        app.setTitleCount(0);
    }

    view() {
        if (!this.category) {
            return LoadingIndicator.component();
        }

        return m('form.CategoryShowPage', {
            onsubmit: this.onsubmit.bind(this),
        }, m('.container', [
            m('.Form-group', [
                m('label', 'Title'),
                m('input.FormControl', {
                    type: 'text',
                    value: this.title,
                    oninput: event => {
                        this.title = event.target.value;
                    },
                }),
            ]),
            m('.Form-group', [
                m('label', 'Description'),
                m('textarea.FormControl', {
                    value: this.description,
                    oninput: event => {
                        this.description = event.target.value;
                    },
                }),
            ]),
            m('.Form-group', [
                Button.component({
                    type: 'submit',
                    className: 'Button Button--primary',
                    loading: this.saving,
                }, 'Save'),
            ]),
        ]));
    }

    data() {
        return {
            title: this.title,
            description: this.description,
        };
    }

    onsubmit(event) {
        event.preventDefault();

        this.saving = true;

        this.category.save(this.data()).then(category => {
            this.category = category;

            this.saving = false;
            m.redraw();
        }).catch(error => {
            this.saving = false;
            m.redraw();
        });
    }
}