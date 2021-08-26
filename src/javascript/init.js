import React from 'react';
import {registry} from '@jahia/ui-extender';
import i18next from 'i18next';
import {Rocket} from '@jahia/moonstone';
import ContentReleaseManagerCmp from './ContentReleaseManager';
import {GET_RELEASES_ACCESS} from './ContentReleaseManager/ReleasesAccess.gql-queries';
import get from 'lodash.get';

i18next.loadNamespaces('content-releases');

const userHasPermissionReleaseAccess = async client => {
    const variables = {
        permissionName: 'contentReleaseManager'
    };
    const asReleaseAccess = await client.query({query: GET_RELEASES_ACCESS, variables});
    return asReleaseAccess;
};

export default function () {
    registry.add('adminRoute', 'contentReleaseManager', {
        targets: ['jcontent:50'],
        icon: <Rocket/>,
        label: 'content-releases:label.appsAccordion.title',
        isSelectable: true,
        requireModuleInstalledOnSite: 'content-releases',
        requiredPermission: 'contentReleaseManager',
        render: () => <ContentReleaseManagerCmp/>
    });
    console.debug('%c contentRelease Manager Extensions  is activated', 'color: #3c8cba');

    registry.add('selectorType.onChange', 'hideReleaseChoicelist', {
        targets: ['Choicelist'],
        onChange: (previousValue, currentValue, field, editorContext) => {
            if (field.nodeType !== 'jmix:releaseItem') {
                return;
            }

            const {client} = editorContext;
            let editorSections = editorContext.getSections();

            userHasPermissionReleaseAccess(client).then(response => {
                const hasPermission = get(response, 'data.currentUser.node.hasPermission', false);

                if (!hasPermission) {
                    editorSections = editorSections.map(section => {
                        if (section.name === 'options') {
                            section = {
                                ...section,
                                fieldSets: section.fieldSets.filter(fieldSet => fieldSet.name !== 'jmix:releaseItem')
                            };
                        }

                        return section;
                    });
                    editorContext.setSections(editorSections);
                }
            });
        }
    });
}
