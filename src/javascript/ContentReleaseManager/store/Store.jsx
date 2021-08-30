import React from 'react';
import {StoreContext} from '../contexts';
import releasesMapper from '../ReleasesModel';
import releaseMapper from '../ReleaseModel';

import PropTypes from 'prop-types';

const init = () => {
    return {
        showDialogHelp: false,
        showDialogCreateRelease: false,
        showDialogEditRelease: false,
        showDialogReleaseContent: false,
        showDialogRemoveRelease: false,
        rootID: null,
        releases: [], // Array of release
        releaseToShow: null,
        releaseToUpdate: null,
        releaseToRemove: null,
        refetchers: {}
    };
};

const reducer = (state, action) => {
    const {payload} = action;

    switch (action.case) {
        case 'DATA_READY': {
            const {releasesData} = payload;
            console.debug('[STORE] DATA_READY - releasesData: ', releasesData);
            const releaseFolder = releasesMapper(releasesData);

            return {
                ...state,
                rootID: releaseFolder.id,
                releases: releaseFolder.releases
            };
        }

        case 'ADD_REFETCHER': {
            const {refetch, queryParams, key} = payload;
            let {refetchers} = state;
            console.debug('[STORE] ADD_REFETCHER');
            refetchers = {
                ...refetchers,
                [key]: {refetch, queryParams}
            };

            return {
                ...state,
                refetchers
            };
        }

        case 'TOGGLE_SHOW_DIALOG_CREATE': {
            console.debug('[STORE] TOGGLE_SHOW_DIALOG_CREATE');
            return {
                ...state,
                showDialogCreateRelease: !state.showDialogCreateRelease
            };
        }

        case 'TOGGLE_SHOW_DIALOG_EDIT': {
            const {release} = payload;
            console.debug('[STORE] TOGGLE_SHOW_DIALOG_EDIT- release ', release);
            return {
                ...state,
                releaseToUpdate: release || null,
                showDialogEditRelease: !state.showDialogEditRelease
            };
        }

        case 'TOGGLE_SHOW_DIALOG_REMOVE': {
            const {release} = payload;
            console.debug('[STORE] TOGGLE_SHOW_DIALOG_REMOVE- release ', release);
            return {
                ...state,
                releaseToRemove: release || null,
                showDialogRemoveRelease: !state.showDialogRemoveRelease
            };
        }

        case 'TOGGLE_SHOW_DIALOG_HELP': {
            console.debug('[STORE] TOGGLE_SHOW_DIALOG_HELP');
            return {
                ...state,
                showDialogHelp: !state.showDialogHelp
            };
        }

        // Disabled
        case 'TOGGLE_SHOW_DIALOG_RELEASE_CONTENT': {
            const {release} = payload;
            console.debug('[STORE] TOGGLE_SHOW_DIALOG_RELEASE_CONTENT - release ', release);

            return {
                ...state,
                releaseToShow: release || null,
                showDialogReleaseContent: !state.showDialogReleaseContent
            };
        }

        case 'ADD_NEW_RELEASE': {
            const {releaseData} = payload;
            let {releases} = state;
            console.debug('[STORE] ADD_NEW_RELEASE - releaseData: ', releaseData);
            const newRelease = releaseMapper(releaseData);
            releases = [...releases, newRelease];

            return {
                ...state,
                releases
            };
        }

        case 'ADD_UPDATED_RELEASE': {
            const {releaseData} = payload;
            let {releases} = state;
            console.debug('[STORE] ADD_NEW_RELEASE - releaseData: ', releaseData);
            const updatedRelease = releaseMapper(releaseData);
            releases = releases.filter(release => release.id !== updatedRelease.id);
            releases = [...releases, updatedRelease];

            return {
                ...state,
                releases
            };
        }

        default:
            throw new Error(`[STORE] action case '${action.case}' is unknown `);
    }
};

export const Store = props => {
    const [state, dispatch] = React.useReducer(
        reducer,
        null,
        init
    );
    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {props.children}
        </StoreContext.Provider>
    );
};

Store.propTypes = {
    children: PropTypes.object.isRequired
};
