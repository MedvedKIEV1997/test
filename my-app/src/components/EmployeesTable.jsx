import { useState } from 'react';
import {
    Grid,
    Table,
    TableHeaderRow,
    SearchPanel,
    Toolbar,
    TableSummaryRow
} from '@devexpress/dx-react-grid-material-ui';
import {
    SortingState,
    IntegratedSorting,
    IntegratedFiltering,
    IntegratedSummary,
    SummaryState,
    SearchState
} from '@devexpress/dx-react-grid';
import { Paper } from '@mui/material';
import { useSelector } from 'react-redux';

import { selectEmployees } from '../redux/ducks/employee.duck';

// TS is bugged for now and will be fixed in 3.0.6

const EmployeesTable = () => {
    const [totalSummaryItems] = useState([{ columnName: 'id', type: 'count' }]);
    const employees = useSelector(selectEmployees);
    const columns = [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' }
    ];

    return (
        <Paper>
            <Grid rows={employees} columns={columns}>
                <SearchState />
                <SortingState
                    defaultSorting={[{ columnName: 'id', direction: 'asc' }]}
                />
                <SummaryState totalItems={totalSummaryItems} />
                <IntegratedSummary />
                <IntegratedSorting />
                <IntegratedFiltering />
                <Toolbar />
                <SearchPanel />
                <Table />
                <TableSummaryRow />
                <TableHeaderRow showSortingControls />
            </Grid>
        </Paper>
    );
};

export default EmployeesTable;
