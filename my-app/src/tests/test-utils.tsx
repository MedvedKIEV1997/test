import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { AppStore, RootState, setupStore } from '../redux/store';
import { BrowserRouter } from 'react-router-dom';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},

        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return (
            <BrowserRouter>
                <Provider store={store}>{children}</Provider>
            </BrowserRouter>
        );
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export const employees = [
    {
        name: 'Doug Lime',
        controls: [2, 3],
        id: 1
    },
    {
        name: 'Lin Cheng',
        controls: [4, 5, 6],
        id: 2
    },
    {
        name: 'Bob Welp',
        controls: [7, 8, 9],
        id: 3
    },
    {
        name: 'Dakota Stein',
        controls: [],
        id: 4
    },
    {
        name: 'Mongo K',
        controls: [],
        id: 5
    },
    {
        name: 'Dew Dong',
        controls: [],
        id: 6
    },
    {
        name: 'Mort Dog',
        controls: [],
        id: 7
    },
    {
        name: 'Forman Go',
        controls: [],
        id: 8
    },
    {
        name: 'Dew Kelg',
        controls: [],
        id: 9
    }
];
