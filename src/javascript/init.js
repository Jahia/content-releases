import React from 'react';
import {registry} from '@jahia/ui-extender';
import i18next from 'i18next';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import ContentReleaseManagerCmp from './ContentReleaseManager';

i18next.loadNamespaces('content-releases');

export default function () {
    registry.add('adminRoute', 'contentReleaseManager', {
        targets: ['jcontent:50'],
        icon: <NewReleasesIcon fontSize="small"/>,
        label: 'content-releases:label.appsAccordion.title',
        isSelectable: true,
        requireModuleInstalledOnSite: 'content-releases',
        render: () => <ContentReleaseManagerCmp/>
    });
    console.debug('%c contentRelease Manager Extensions  is activated', 'color: #3c8cba');
}
