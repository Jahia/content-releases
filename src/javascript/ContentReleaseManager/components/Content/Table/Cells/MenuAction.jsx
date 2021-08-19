import React from 'react';
// Import PropTypes from 'prop-types';
import {Button, MoreVert, Menu, MenuItem, Edit, Delete} from '@jahia/moonstone';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {StoreContext} from '../../../../contexts';

// Let styles = () => ({
//     delete: {
//         color: 'var(--color-danger)'
//     }
// });

const MenuAction = props => {
    const {release} = props;
    const {dispatch} = React.useContext(StoreContext);

    const [isDisplayed, setIsDisplayed] = React.useState(false);
    const [menuPosition, setMenuPosition] = React.useState();
    const {t} = useTranslation('content-releases');

    const handleOnClick = e => {
        if (isDisplayed) {
            handleClose();
        } else {
            setIsDisplayed(true);
            setMenuPosition({
                top: e.clientY,
                left: e.clientX
            });
        }
    };

    const handleClose = () => {
        setIsDisplayed(false);
    };

    const handleEditClick = () => {
        setIsDisplayed(false);
        dispatch({
            case: 'TOGGLE_SHOW_DIALOG_EDIT',
            payload: {
                release
            }
        });
    };

    const handleDeleteClick = () => {
        setIsDisplayed(false);
        dispatch({
            case: 'TOGGLE_SHOW_DIALOG_REMOVE',
            payload: {
                release
            }
        });
    };

    return (
        <>
            <Button key="b1"
                    icon={<MoreVert fontSize="large"/>}
                    size="big"
                    color="default"
                    variant="ghost"
                    onClick={handleOnClick}/>
            <Menu
                isDisplayed={isDisplayed}
                anchorPosition={menuPosition}
                onClose={handleClose}
            >
                <MenuItem iconStart={<Edit/>}
                          label={t('label.action.edit')}
                          onClick={handleEditClick}
                />
                <MenuItem iconStart={<Delete/>}
                          style={{color: 'var(--color-danger)'}}
                          label={t('label.action.delete')}
                          onClick={handleDeleteClick}
                />
            </Menu>
        </>
    );
};

MenuAction.propTypes = {
    // Classes: PropTypes.object.isRequired,
    release: PropTypes.object.isRequired
};
export default MenuAction;
