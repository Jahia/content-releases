import React from 'react';
// Import {ContentLayout} from '@jahia/moonstone-alpha';
import {Header} from '@jahia/moonstone/dist/components/Header';
import {useTranslation} from 'react-i18next';
// Import AjvError from './components/Error/Ajv';
// import {WidenPicker} from './components/WidenPicker';
// import {Store} from './Store';
// import * as PropTypes from 'prop-types';
// import {contextValidator} from './douane';

const ContentReleaseManagerCmp = props => {
    console.log('ContentReleaseManagerCmp props:', props);
    const {t} = useTranslation('content-releases');

    // Const getContent = () => {
    //     return (
    //         <div style={{padding: 'var(--spacing-medium)'}}>
    //             Super cool ce truc
    //         </div>
    //     );
    // };

    return (
        <>
            <Header title={t('label.settings.title')}/>

            <div style={{padding: 'var(--spacing-medium)'}}>
                Super cool ce truc
            </div>
        </>
    );
};

// Const ContentReleaseManagerCmp = ({field, id, value, editorContext, setActionContext, onChange}) => {
//     // Console.debug('[ContentReleaseManagerCmp] field',field);
//     // console.debug('[ContentReleaseManagerCmp] id',id);
//     // console.debug('[ContentReleaseManagerCmp] value',value);
//     // console.debug('[ContentReleaseManagerCmp] editorContext',editorContext);
//
//     let context = {
//         widen: {
//             url: window.contextJsParameters.config.widen.url,
//             version: window.contextJsParameters.config.widen.version,
//             site: window.contextJsParameters.config.widen.site,
//             token: window.contextJsParameters.config.widen.token,
//             mountPoint: window.contextJsParameters.config.widen.mountPoint,
//             lazyLoad: window.contextJsParameters.config.widen.lazyLoad,
//             resultPerPage: window.contextJsParameters.config.widen.resultPerPage
//         },
//         editor: {
//             onChange,
//             field,
//             value,
//             editorContext,
//             setActionContext
//         }
//     };
//
//     try {
//         context = contextValidator(context);
//
//         return (
//             <Store context={context}>
//                 <WidenPicker
//                     id={id}
//                     initEditorValue={context.editor.value}
//                 />
//             </Store>
//         );
//     } catch (e) {
//         console.error('error : ', e);
//         // Note: create a generic error handler
//         return (
//             <AjvError
//                 item={e.message}
//                 errors={e.errors}
//             />
//         );
//     }
// };

ContentReleaseManagerCmp.propTypes = {
    // Field: PropTypes.object,
    // id: PropTypes.string.isRequired,
    // value: PropTypes.string,
    // editorContext: PropTypes.object.isRequired,
    // onChange: PropTypes.func.isRequired,
    // setActionContext: PropTypes.func.isRequired
};

ContentReleaseManagerCmp.displayName = 'ContentReleaseManager';
export default ContentReleaseManagerCmp;
