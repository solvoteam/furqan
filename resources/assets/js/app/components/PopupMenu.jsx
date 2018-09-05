import React, { Fragment } from 'react';
import { compose, withHandlers, withState, lifecycle } from 'recompose';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

const PopupMenu = ({ id, open, title, onClick, target, children }) => {
    return (
        <Fragment>
            <div id={id} onClick={onClick}>
                {target}
                {open && (
                    <Popover
                        className="popup-menu"
                        placement="bottom"
                        isOpen={open}
                        target={id}
                        toggle={onClick}>
                        {title && <PopoverHeader>Popover Title</PopoverHeader>}
                        <PopoverBody>{children}</PopoverBody>
                    </Popover>
                )}
            </div>
        </Fragment>
    );
};

export default compose(
    withState('open', 'setOpen', false),
    withHandlers({
        onClick: ({ setOpen, open, onOpened }) => () => {
            setOpen(!open, onOpened);
        },
    }),
)(PopupMenu);
