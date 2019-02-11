create-action-ts
===

> Helper to create typed actions creators in React+Redux+TypeScript apps.

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

```typescript
/* constants.ts */
export enum ActionKeys {
    SET_USER_INFO = 'SET_USER_INFO',
    RESET_USER_INFO = 'RESET_USER_INFO',
    TOGGLE_ACCORDION = 'TOGGLE_ACCORDION',
}
```

```typescript
/* actions.ts */
import createAction from 'create-action-ts';

import { ActionKeys } from 'constants.ts';

/* Create typed action creators. */
export const setUserInfo = (id: string) => createAction(ActionKeys.SET_USER_INFO, id);
export const resetUserInfo = () => createAction(ActionKeys.RESET_USER_INFO);
export const toggleAccordion = (meta: { name: string }) => createAction(ActionKeys.TOGGLE_ACCORDION, null, meta);

/* Create Type alias for action. */
export type ActionType =
    ReturnType<typeof setUserInfo> &
    ReturnType<typeof resetUserInfo> &
    ReturnType<typeof toggleAccordion>;
```

```typescript
/* reducer.ts */
import { ActionKeys } from 'constants.ts';
import { ActionType } from 'actions.ts';

/* ... */

/* Use ActionType for checking actions type. */
export default function reducer(state: StoreType = initialState, action: ActionType) {
    switch (action.type) {
        /* ... */
    }
}
```

```typescript jsx
/* index.tsx */
import React, { PureComponent } from 'react';

import * as actions from 'actions.ts';

interface PropsType {
    /**
    * Use type of Action creators from actions.ts for checking props types.
    */
    resetUserInfo: typeof actions.resetUserInfo,
    setUserInfo: typeof actions.setUserInfo,
    toggleAccordion: typeof actions.toggleAccordion,
}

class Page extends PureComponent<PropsType> {
    render() {
        return (
            <div>
                /* ... */
            </div>
        );
    }
}
```

## Test

```
$ git clone git@github.com:ahtohbi4/create-action-ts.git
$ cd create-action-ts
$ npm install
$ npm run test
```
