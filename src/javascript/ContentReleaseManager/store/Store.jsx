import React from 'react';
import {StoreContext} from '../contexts';
import releasesMapper from '../ReleasesModel';
import releaseMapper from '../ReleaseModel';

import PropTypes from 'prop-types';

const init = () => {
    // Console.log("jContent.transition : ",jContent.transition);
    return {
        showDialogHelp: false,
        showDialogCreateRelease: false,
        showDialogEditRelease: false,
        showDialogReleaseContent: false,
        rootID: null,
        releases: [], // Array of release
        releaseToShow: null,
        releaseToUpdate: null
    };
};

const reducer = (state, action) => {
    const {payload} = action;

    switch (action.case) {
        case 'DATA_READY': {
            const {releasesData} = payload;
            console.debug('[STORE] DATA_READY - releasesData: ', releasesData);
            const releaseFolder = releasesMapper(releasesData);

            console.log('[STORE] DATA_READY - releases : ', releaseFolder.releases);
            return {
                ...state,
                rootID: releaseFolder.id,
                releases: releaseFolder.releases
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

        case 'TOGGLE_SHOW_DIALOG_HELP': {
            console.debug('[STORE] TOGGLE_SHOW_DIALOG_HELP');
            return {
                ...state,
                showDialogHelp: !state.showDialogHelp
            };
        }

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

        // Case 'ADD_CXS': {
        //     const cxs = payload.cxs;
        //     console.debug('[STORE] ADD_CXS - cxs: ', cxs);
        //     return {
        //         ...state,
        //         cxs
        //     };
        // }
        //
        // case 'ADD_SLIDES': {
        //     const slides = payload.slides;
        //     const parentSlide = payload.parentSlide;
        //     let slideSet = state.slideSet;
        //
        //     if (parentSlide && slideSet.includes(parentSlide)) {
        //         const position = slideSet.indexOf(parentSlide) + 1;
        //         slideSet.splice(position, 0, ...slides);
        //     } else {
        //         slideSet = [...slideSet, ...slides];
        //     }
        //
        //     const max = slideSet.length - 1;
        //
        //     console.debug('[STORE] ADD_SLIDE - slides: ', slides, ' parentSlide: ', parentSlide);
        //     return {
        //         ...state,
        //         slideSet,
        //         showNext: showNext({slideSet, max, slide: state.currentSlide}),
        //         max
        //     };
        // }
        //
        // case 'NEXT_SLIDE': {
        //     const currentIndex = state.slideSet.indexOf(state.currentSlide);
        //     const nextIndex = currentIndex + 1;
        //     console.debug('[STORE] NEXT_SLIDE - currentIndex: ', currentIndex, ', max : ', state.max);
        //
        //     let nextSlide = state.currentSlide;
        //
        //     if (currentIndex < state.max) {
        //         nextSlide = state.slideSet[nextIndex];
        //     }
        //
        //     // Const showScore = nextIndex === state.max-1;
        //
        //     return {
        //         ...state,
        //         currentSlide: nextSlide,
        //         showNext: showNext({...state, slide: nextSlide}),
        //         showResult: false,
        //         // ShowScore,
        //         // score,
        //         reset: false
        //     };
        // }
        //
        // case 'SHOW_SCORE': {
        //     console.debug('[STORE] SHOW_SCORE');
        //     const [slide] = state.slideSet.slice(-1);
        //     const {quiz} = state;
        //     let {score} = state;
        //
        //     if (!quiz.personalizedResult || !quiz.personalizedResult.id) {
        //         score = getScore({
        //             resultSet: state.resultSet,
        //             quizKey: state.quiz.key,
        //             split: state.jContent.score_splitPattern
        //         });
        //     }
        //
        //     // Const goodAnswers = state.resultSet.filter(result => result).length;
        //     // const answers = state.resultSet.length;
        //     // const score = Math.floor((goodAnswers/answers)*100);
        //     //
        //     // syncQuizScore({
        //     //     quizKey:state.quiz.key,
        //     //     split:state.jContent.score_splitPattern,
        //     //     quizScore:score
        //     // });
        //
        //     return {
        //         ...state,
        //         currentSlide: slide,
        //         showNext: showNext({...state, slide}),
        //         showResult: false,
        //         score
        //     };
        // }
        //
        // case 'SHOW_SLIDE': {
        //     const slide = payload.slide;
        //     console.debug('[STORE] SHOW_SLIDE - slide: ', slide);
        //     return {
        //         ...state,
        //         currentSlide: slide,
        //         showNext: showNext({...state, slide})
        //     };
        // }
        //
        // case 'SHOW_RESULT': {
        //     const {result: currentResult, skipScore} = payload;
        //     const currentIndex = state.slideSet.indexOf(state.currentSlide);
        //     const nextIndex = currentIndex + 1;
        //     const showScore = nextIndex === state.max;
        //
        //     console.debug('[STORE] SHOW_RESULT - currentResult: ', currentResult);
        //
        //     const resultSet = [...state.resultSet, currentResult];
        //     const {quiz} = state;
        //     let {score, currentSlide: nextSlide} = state;
        //
        //     if (skipScore) {
        //         if (showScore) {
        //             if (!quiz.personalizedResult || !quiz.personalizedResult.id) {
        //                 score = getScore({
        //                     resultSet: resultSet,
        //                     quizKey: state.quiz.key,
        //                     split: state.jContent.score_splitPattern
        //                 });
        //             }
        //
        //             [nextSlide] = state.slideSet.slice(-1);
        //         } else {
        //             nextSlide = state.slideSet[nextIndex];
        //         }
        //     }
        //
        //     return {
        //         ...state,
        //         currentSlide: nextSlide,
        //         showNext: showNext({...state, slide: nextSlide}),
        //         showScore,
        //         resultSet,
        //         currentResult,
        //         score,
        //         showResult: !skipScore
        //     };
        // }
        //
        // // Case "SHOW_RESULT": {
        // //     const currentResult = payload.result;
        // //     const currentIndex = state.slideSet.indexOf(state.currentSlide);
        // //     const showScore = currentIndex === state.max-1;
        // //     console.debug("[STORE] SHOW_RESULT - currentResult: ", currentResult);
        // //
        // //     return {
        // //         ...state,
        // //         showScore,
        // //         resultSet: [...state.resultSet, currentResult],
        // //         currentResult,
        // //         showResult: true
        // //     };
        // // }
        // case 'RESET': {
        //     console.debug('[STORE] RESET');
        //
        //     const [currentSlide] = state.slideSet.slice(0, 1);
        //     console.debug('[STORE] RESET slideSet', state.slideSet);
        //
        //     return {
        //         ...state,
        //         currentSlide,
        //         resultSet: [],
        //         showScore: false,
        //         currentResult: false,
        //         reset: true
        //     };
        // }
        //
        // case 'TOGGLE_TRANSITION': {
        //     console.debug('[STORE] TOGGLE_TRANSITION');
        //     return {
        //         ...state,
        //         transitionActive: !state.transitionActive
        //     };
        // }

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
