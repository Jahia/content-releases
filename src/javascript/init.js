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
        requiredPermission: 'contentReleaseManagerAccess',
        render: () => <ContentReleaseManagerCmp/>
    });
    console.debug('%c contentRelease Manager Extensions  is activated', 'color: #3c8cba');

    // Registry.add('callback', 'release-manager', {
    //     targets: ['jahiaApp-init:30'],
    //     callback: function () {
    //         const contentPicker = registry.get('selectorType', 'ContentPicker');
    //         const releaseNodePickerCmp = {
    //             picker: contentPicker,
    //             treeConfigs: [{
    //                 rootPath: site => `/sites/${site}/releases-manager/releases`,
    //                 openableTypes: ['jnt:contentFolder'],
    //                 selectableTypes: ['jnt:contentFolder'],
    //                 type: 'contents',
    //                 rootLabelKey: 'content-editor:label.contentEditor.edit.fields.contentPicker.contentsRootLabel'
    //             }],
    //             searchSelectorType: 'jnt:release',
    //             listTypesTable: ['jnt:release'],
    //             selectableTypesTable: ['jnt:release']
    //         };
    //
    //         console.debug('releaseNodePickerCmp', releaseNodePickerCmp);
    //
    //         registry.add('pickerConfiguration', 'releaseNode', {
    //             cmp: releaseNodePickerCmp
    //         });
    //         console.debug('%c releaseNode pickerConfiguration Extensions  is activated', 'color: #3c8cba');
    //     }
    // });
}
