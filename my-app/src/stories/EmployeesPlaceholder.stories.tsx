import 'bootstrap/dist/css/bootstrap.css';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import EmployeesPlaceholder from '../components/EmployeesPlaceholder';

export default {
    title: 'Employees Placeholder',
    component: EmployeesPlaceholder
} as ComponentMeta<typeof EmployeesPlaceholder>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof EmployeesPlaceholder> = () => (
    <EmployeesPlaceholder />
);

export const FirstStory = Template.bind({});

FirstStory.args = {};
