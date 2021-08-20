import React from 'react';
import PropTypes from 'prop-types';
import {IconTextIcon, Not, SvgWrapper} from '@jahia/moonstone';
import {withStyles} from '@material-ui/core';

const styles = () => ({
    clickable: {
        cursor: 'pointer'
    }
});

const ReleaseName = props => {
    const {classes, release} = props;
    // Console.log('ReleaseName release ->', release);

    const handleClick = () => {
        const urlbase = window.contextJsParameters.urlbase;
        const siteKey = window.contextJsParameters.siteKey;
        const lang = window.contextJsParameters.lang;
        const searchType = 'jmix:releaseItem';
        const query = `params=(searchPath:/sites/${siteKey},sql2SearchFrom:'${searchType}',sql2SearchWhere:'releases+=!'${release.id}!'')`;
        // Const encodedQuery = encodeURIComponent(query);
        const url = `${urlbase}/jcontent/${siteKey}/${lang}/sql2Search/sites/${siteKey}/home?${query}`;
        window.open(url, '_blank');
        // Console.log('handleClick table release : ', release);
        // dispatch({
        //     case: 'TOGGLE_SHOW_DIALOG_RELEASE_CONTENT',
        //     payload: {
        //         release
        //     }
        // });
    };

    const svgString = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.82273 10.8193L7.0507 11.7023C6.7995 12.3084 6.59912 12.9327 6.45146 13.5693L6.36695 13.9364L9.56101 16.9912L9.94514 16.9122C10.6111 16.7711 11.2643 16.5796 11.8985 16.3395L12.8223 18.469C12.8313 18.4901 12.8457 18.5087 12.8642 18.5232C12.8826 18.5377 12.9046 18.5475 12.928 18.5519C12.9514 18.5563 12.9756 18.555 12.9984 18.5482C13.0212 18.5414 13.0418 18.5294 13.0585 18.5131L14.4549 17.1784C14.6827 16.9607 14.8603 16.6996 14.9761 16.4122C15.0919 16.1248 15.1433 15.8173 15.1271 15.5097L15.0771 14.6524C17.6624 12.8276 20.2783 9.62782 20.9909 4.04334C21.0111 3.90333 20.9972 3.76074 20.9503 3.6267C20.9034 3.49266 20.8247 3.37079 20.7204 3.27058C20.6161 3.17037 20.489 3.09453 20.3491 3.04898C20.2091 3.00343 20.06 2.98939 19.9134 3.00796C14.0726 3.69454 10.723 6.19673 8.81387 8.66036L7.91884 8.6163C7.59771 8.5996 7.27647 8.64732 6.97579 8.7564C6.6751 8.86548 6.40163 9.0335 6.17296 9.24965L4.77664 10.5843C4.75729 10.6 4.74264 10.6203 4.73416 10.6432C4.72568 10.6661 4.72368 10.6907 4.72836 10.7145C4.73304 10.7384 4.74423 10.7606 4.76081 10.779C4.77738 10.7974 4.79874 10.8113 4.82273 10.8193ZM13.7807 7.56623C14.0227 7.33574 14.3307 7.17895 14.6659 7.11566C15.001 7.05238 15.3483 7.08543 15.6638 7.21065C15.9793 7.33587 16.2489 7.54764 16.4386 7.81922C16.6282 8.0908 16.7295 8.41001 16.7295 8.73655C16.7295 9.06308 16.6282 9.38229 16.4386 9.65387C16.2489 9.92545 15.9793 10.1372 15.6638 10.2624C15.3483 10.3877 15.001 10.4207 14.6659 10.3574C14.3307 10.2941 14.0227 10.1374 13.7807 9.90686C13.6196 9.75337 13.4917 9.57098 13.4044 9.37015C13.3172 9.16932 13.2723 8.954 13.2723 8.73655C13.2723 8.51909 13.3172 8.30378 13.4044 8.10295C13.4917 7.90212 13.6196 7.71973 13.7807 7.56623ZM4.40595 17.2353C4.03623 17.1113 3.6392 17.081 3.25355 17.1472C3.21928 17.1543 3.18368 17.153 3.1501 17.1433C3.11651 17.1337 3.08602 17.1161 3.06149 17.0922C3.03107 17.0632 3.01071 17.026 3.00315 16.9856C2.99559 16.9452 3.00121 16.9036 3.01923 16.8664C3.42833 16.0256 4.51351 14.3348 6.47834 15.7006C6.48861 15.7094 6.49682 15.7202 6.50244 15.7322C6.50806 15.7442 6.51097 15.7572 6.51097 15.7704C6.51097 15.7836 6.50806 15.7966 6.50244 15.8086C6.49682 15.8206 6.48861 15.8314 6.47834 15.8401C6.21529 16.0382 6.00468 16.2925 5.86355 16.5828C5.72241 16.873 5.6547 17.1909 5.6659 17.5107C5.66733 17.5483 5.68358 17.5839 5.71137 17.6105C5.73916 17.637 5.77644 17.6525 5.81572 17.6539C6.14894 17.6667 6.48065 17.6046 6.78421 17.4726C7.08776 17.3406 7.35468 17.1424 7.56352 16.8939C7.57271 16.8831 7.58428 16.8745 7.5974 16.8685C7.61052 16.8626 7.62486 16.8595 7.63938 16.8595C7.65391 16.8595 7.66825 16.8626 7.68137 16.8685C7.69449 16.8745 7.70606 16.8831 7.71525 16.8939C7.98799 17.2041 8.73896 18.2175 7.90732 19.196C7.54425 19.6131 7.02404 19.8768 6.45914 19.9303C5.65246 20.0129 4.16203 20.2644 3.55318 20.929C3.52874 20.9566 3.49689 20.9775 3.46105 20.9892C3.4252 21.0009 3.38669 21.0032 3.34962 20.9956C3.31256 20.9881 3.27833 20.9711 3.25059 20.9464C3.22284 20.9217 3.20263 20.8903 3.19209 20.8555C2.97698 20.1543 2.64278 18.5865 4.40595 17.2353Z" fill="black"/></svg>';
    const getDisplay = () => {
        if (release.items.length > 0) {
            return (
                // <IconTextIcon className={classes.clickable}
                //               iconStart={<File/>}
                //               onClick={handleClick}
                // >
                <IconTextIcon className={classes.clickable}
                              iconStart={<SvgWrapper svg={svgString} size="big"/>}
                              onClick={handleClick}
                >
                    {release.name}
                </IconTextIcon>
            );
        }

        return <IconTextIcon iconStart={<Not/>}>{release.name}</IconTextIcon>;
    };

    return (
        <>{getDisplay()}</>
    );
};

ReleaseName.propTypes = {
    classes: PropTypes.object.isRequired,
    release: PropTypes.object.isRequired
};

export default withStyles(styles)(ReleaseName);
