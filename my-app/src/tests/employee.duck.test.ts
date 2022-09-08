import reducer, {
    initialState,
    sliceActions
} from '../redux/ducks/employee.duck';

describe('employee slice tests', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual(initialState);
    });

    it('should set employee and his subordinates', () => {
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

    it('should set employees', () => {
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
    it('should set subordinatesToShow', () => {
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
    it('should set loading to false', () => {
        expect(reducer(initialState, sliceActions.setLoading(false))).toEqual({
            employee: null,
            allEmployees: [],
            subordinates: [],

            subordinatesToShow: [],
            loading: false
        });
    });
});
