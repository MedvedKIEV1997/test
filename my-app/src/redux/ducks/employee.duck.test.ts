import reducer, { InitialState, sliceActions } from './employee.duck';

const initialState: InitialState = {
    employee: null,
    allEmployees: [],
    subordinates: [],
    subordinatesToShow: [],
    loading: true
};

describe('employeeSlice tests', () => {
    test('should return the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual({
            employee: null,
            allEmployees: [],
            subordinates: [],
            subordinatesToShow: [],
            loading: true
        });
    });

    test('should set employee and his subordinates', () => {
        expect(
            reducer(
                initialState,
                sliceActions.setEmployee({
                    name: 'Luck',
                    controls: [5, 6],
                    id: 11
                })
            )
        ).toEqual({
            employee: {
                name: 'Luck',
                controls: [5, 6],
                id: 11
            },
            allEmployees: [],
            subordinates: [5, 6],

            subordinatesToShow: [],
            loading: true
        });
    });

    test('should set employees', () => {
        expect(
            reducer(
                initialState,
                sliceActions.setEmployees([
                    {
                        name: 'Luck',
                        controls: [5, 6],
                        id: 11
                    },
                    {
                        name: 'Seline',
                        controls: [],
                        id: 13
                    }
                ])
            )
        ).toEqual({
            employee: null,
            allEmployees: [
                {
                    name: 'Luck',
                    controls: [5, 6],
                    id: 11
                },
                {
                    name: 'Seline',
                    controls: [],
                    id: 13
                }
            ],
            subordinates: [],

            subordinatesToShow: [],
            loading: true
        });
    });
    test('should set subordinatesToShow', () => {
        expect(
            reducer(
                initialState,
                sliceActions.setSubordinates([
                    {
                        name: 'Luck',
                        controls: [5, 6],
                        id: 11
                    },
                    {
                        name: 'Seline',
                        controls: [],
                        id: 13
                    }
                ])
            )
        ).toEqual({
            employee: null,
            allEmployees: [],
            subordinates: [5, 6],

            subordinatesToShow: [
                {
                    name: 'Luck',
                    controls: [5, 6],
                    id: 11
                },
                {
                    name: 'Seline',
                    controls: [],
                    id: 13
                }
            ],
            loading: true
        });
    });
    test('should set loading to false', () => {
        expect(reducer(initialState, sliceActions.setLoading(false))).toEqual({
            employee: null,
            allEmployees: [],
            subordinates: [],

            subordinatesToShow: [],
            loading: false
        });
    });
});
