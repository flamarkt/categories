import {Children} from 'mithril';
import app from 'flamarkt/backoffice/backoffice/app';
import AbstractShowPage from 'flamarkt/backoffice/common/pages/AbstractShowPage';
import SubmitButton from 'flamarkt/backoffice/backoffice/components/SubmitButton';
import SoftDeleteButton from 'flamarkt/backoffice/backoffice/components/SoftDeleteButton';
import PermanentDeleteButton from 'flamarkt/backoffice/backoffice/components/PermanentDeleteButton';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import ItemList from 'flarum/common/utils/ItemList';
import Category from '../../common/models/Category';
import CategoryRelationshipSelect from '../components/CategoryRelationshipSelect';

export default class CategoryShowPage extends AbstractShowPage {
    category: Category | null = null;
    saving: boolean = false;
    dirty: boolean = false;
    parent: Category | null = null;
    slug: string = '';
    title: string = '';
    description: string = '';
    priority: string = '';

    newRecord() {
        return app.store.createRecord('flamarkt-categories');
    }

    findType() {
        return 'flamarkt/categories';
    }

    show(category: Category) {
        this.category = category;
        this.parent = category.parent() || null;
        this.slug = category.slug() || '';
        this.title = category.title() || '';
        this.description = category.description() || '';
        this.priority = category.priority() + '';

        app.setTitle(category.title());
        app.setTitleCount(0);
    }

    view() {
        if (!this.category) {
            return LoadingIndicator.component();
        }

        return m('form.CategoryShowPage', {
            onsubmit: this.onsubmit.bind(this),
        }, m('.container.container--narrow', this.fields().toArray()));
    }

    fields(): ItemList<Children> {
        const fields = new ItemList<Children>();

        fields.add('parent', m('.Form-group', [
            m('label', 'Parent'),
            m(CategoryRelationshipSelect, {
                relationship: this.parent,
                onchange: (category: Category) => {
                    this.parent = category;
                    this.dirty = true;
                },
                hasOne: true,
            }),
        ]), 100);

        fields.add('slug', m('.Form-group', [
            m('label', 'Slug'),
            m('input.FormControl', {
                type: 'text',
                value: this.slug,
                oninput: (event: Event) => {
                    this.slug = (event.target as HTMLInputElement).value;
                    this.dirty = true;
                },
            }),
        ]), 80);

        fields.add('title', m('.Form-group', [
            m('label', 'Title'),
            m('input.FormControl', {
                type: 'text',
                value: this.title,
                oninput: (event: Event) => {
                    this.title = (event.target as HTMLInputElement).value;
                    this.dirty = true;
                },
            }),
        ]), 60);

        fields.add('description', m('.Form-group', [
            m('label', 'Description'),
            m('textarea.FormControl', {
                value: this.description,
                oninput: (event: Event) => {
                    this.description = (event.target as HTMLInputElement).value;
                    this.dirty = true;
                },
            }),
        ]), 40);

        fields.add('priority', m('.Form-group', [
            m('label', 'Priority'),
            m('input.FormControl', {
                type: 'number',
                min: 0,
                value: this.priority,
                oninput: (event: Event) => {
                    this.priority = (event.target as HTMLInputElement).value;
                    this.dirty = true;
                },
            }),
        ]), 20);

        fields.add('submit', m('.Form-group', [
            SubmitButton.component({
                loading: this.saving,
                dirty: this.dirty,
                exists: this.category!.exists,
            }),
            ' ',
            SoftDeleteButton.component({
                model: this.category,
            }),
            ' ',
            PermanentDeleteButton.component({
                model: this.category,
                afterdelete() {
                    m.route.set(app.route('categories.index'));
                },
            }),
        ]), -10);

        return fields;
    }

    data() {
        return {
            slug: this.slug,
            title: this.title,
            description: this.description,
            priority: parseInt(this.priority),
            relationships: {
                parent: this.parent,
            },
        };
    }

    onsubmit(event: Event) {
        event.preventDefault();

        this.saving = true;

        this.category!.save(this.data()).then(category => {
            this.category = category;

            this.saving = false;
            this.dirty = false;
            m.redraw();

            m.route.set(app.route.category(category));
        }).catch(error => {
            this.saving = false;
            m.redraw();
        });
    }
}
