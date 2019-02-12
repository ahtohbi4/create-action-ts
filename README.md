create-action-ts
===

[![NPM version][version-img]][version-url] [![Dependency status][dependency-img]][dependency-url] [![Travis build status][travis-img]][travis-url]

[dependency-img]: https://david-dm.org/ahtohbi4/create-action-ts/dev-status.svg
[dependency-url]: https://david-dm.org/ahtohbi4/create-action-ts#info=devDependencies
[version-img]: https://badge.fury.io/js/create-action-ts.svg
[version-url]: https://badge.fury.io/js/create-action-ts
[travis-img]: https://travis-ci.org/ahtohbi4/create-action-ts.svg?branch=master
[travis-url]: https://travis-ci.org/ahtohbi4/create-action-ts

> Helper to create typed actions or action creators in React+Redux+TypeScript apps.

## Install

With npm:

```
$ npm install --save create-action-ts
```

With yarn:

```
$ yarn add create-action-ts
```

## Usage

##### Syntax

```text
createAction(type[, payload, meta]);
```

Parameters:

 * `type` — **Required**. String as a type of the action.
 * `payload` — Any type of payload.
 * `meta` — Any type of meta information.

##### Create action

```typescript
const action = createAction('counter', 5);

// -> { type: "counter", payload: 5 }
```

##### Create action creators

```typescript
const actionCreator = (count: string) => createAction('counter', count);

// -> (count: string): { type: "counter", payload: string }
```

##### Example

Let's say, you have a structure of the container below:

```text
├─ components
└─ containers
    └─ SomePage
        ├─ actions.ts
        ├─ constants.ts
        ├─ index.tsx
        ├─ reducer.ts
        └─ types.ts
```

1. Describe possible action keys by `enum` from TypeScript:

```typescript
/* constants.ts */

export enum ActionKeys {
    SET_USER_INFO = 'SET_USER_INFO',
    RESET_USER_INFO = 'RESET_USER_INFO',
    TOGGLE_ACCORDION = 'TOGGLE_ACCORDION',
}
```

2. Create Action creators by `createAction()` function:

```typescript
/* actions.ts */

import createAction from 'create-action-ts';
import { ActionKeys } from 'constants.ts';

export const setUserInfo = (id: string) => createAction(ActionKeys.SET_USER_INFO, id);
export const resetUserInfo = () => createAction(ActionKeys.RESET_USER_INFO);
export const toggleAccordion = (meta: { name: string }) => createAction(ActionKeys.TOGGLE_ACCORDION, null, meta);
```

3. Describe all types of the Action creators and the Actions we need:

```typescript
/* types.ts */

import { resetUserInfo, setUserInfo, toggleAccordion } from 'actions.ts';

export type SetUserInfoActionCreator = typeof setUserInfo;
export type ResetUserInfoActionCreator = typeof resetUserInfo;
export type ToggleAccordionActionCreator = typeof toggleAccordion;

export type ActionType =
    ReturnType<SetUserInfoActionCreator> &
    ReturnType<ResetUserInfoActionCreator> &
    ReturnType<ToggleAccordionActionCreator>;
```

4. Use the types in reducer:

```typescript
/* reducer.ts */

import { ActionKeys } from 'constants.ts';
import { ActionType, StoreType } from 'types.ts';

export default function reducer(state: StoreType, action: ActionType) {
    switch (action.type) { /* ... */ }
}
```

container's template:

```typescript jsx
/* index.tsx */

import React, { PureComponent } from 'react';
import { SetUserInfoActionCreator, ResetUserInfoActionCreator, ToggleAccordionActionCreator } from 'types.ts';

interface PropsType {
    resetUserInfo: ResetUserInfoActionCreator,
    setUserInfo: SetUserInfoActionCreator,
    toggleAccordion: ToggleAccordionActionCreator,
}

class Page extends PureComponent<PropsType> {
    render() { /* ... */ }
}
```

or anywhere else...

## Test

```
$ git clone git@github.com:ahtohbi4/create-action-ts.git
$ cd create-action-ts
$ npm install
$ npm run test
```
