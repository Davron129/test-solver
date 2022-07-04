import { configureStore } from "@reduxjs/toolkit";

import testReducer from './features/tests'

export const store = configureStore({
    reducer: {
        test: testReducer
    },
})