import createAction from './';

test('With type only', () => {
  const action = createAction('some');
  expect(action).toEqual({ type: 'some' });
});

test('With a payload', () => {
  const action = createAction('some', { foo: 42 });
  expect(action).toEqual({
    type: 'some',

    payload: { foo: 42 },
  });
});

test('With a meta', () => {
  const action = createAction('some', {}, { foo: 'BAZ' });
  expect(action).toEqual({
    type: 'some',

    meta: { foo: 'BAZ' },
    payload: {},
  });
});
