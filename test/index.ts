import { expect } from 'chai';
import 'mocha';

import createAction from '../src';

enum ActionKeys {
    SIMPLE = 'simpleAction',
    WITH_PAYLOAD = 'actionWithPayload',
    WITH_META = 'actionWithMeta',
}

describe('The function createAction()', () => {
    it('should return the action creator for a simple Action', () => {
        const actionCreator = () => createAction(ActionKeys.SIMPLE);

        expect(actionCreator()).to.deep.equal({ type: 'simpleAction' });
    });

    it('should return the action creator for an Action with payload', () => {
        const action = (payload: number) => createAction(ActionKeys.WITH_PAYLOAD, payload);

        expect(action(2)).to.deep.equal({
            payload: 2,
            type: 'actionWithPayload',
        });
    });

    it('should return the action creator for an Action with meta', () => {
        const actionCreator = (meta: object) => createAction(ActionKeys.WITH_META, null, meta);
        const action = actionCreator({
            field: 'some-field',
            form: 'some-form',
        });

        expect(action).to.deep.equal({
            meta: {
                field: 'some-field',
                form: 'some-form',
            },
            type: 'actionWithMeta',
        });
    });

    it('should return the action creator for an Action with meta and payload', () => {
        interface Meta {
            entity: string;
        }
        interface Payload {
            data: object[];
            page: number;
            pages: number;
        }
        const actionCreator = (payload: Payload, meta: Meta) => createAction(ActionKeys.WITH_META, payload, meta);
        const action = actionCreator({
            data: [],
            page: 1,
            pages: 1,
        }, {
            entity: 'pokemons',
        });

        expect(action).to.deep.equal({
            meta: {
                entity: 'pokemons',
            },
            payload: {
                data: [],
                page: 1,
                pages: 1,
            },
            type: 'actionWithMeta',
        });
    });
});
