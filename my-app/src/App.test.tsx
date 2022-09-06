/**
 * @jest-environment-options {"url": "http://localhost:8000/"}
 */

import { renderWithProviders } from './test-utils';

import { BrowserRouter } from 'react-router-dom';
import App from './App';

it('should render app', async () => {
    const { asFragment } = await renderWithProviders(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});
