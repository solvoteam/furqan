import React, { Fragment } from 'react';
import { compose, withHandlers, withState, lifecycle } from 'recompose';

const PopupMenu = ({ open, onClick, target, children }) => {
    return (
        <Fragment>
            <div onClick={onClick}>
                {target}
                {open && <div className="popup-menu">{children}</div>}
            </div>
        </Fragment>
    );
};

export default compose(
    withState('open', 'setOpen', false),
    lifecycle({
        componentDidMount() {
            this.documentClickListener = e => {
                if (!/popup-menu|surah-menu|svg|path|icon/.test(e.target.className)) {
                    this.props.setOpen(false);
                }
            };
            document.addEventListener('click', this.documentClickListener);
        },
        componentWillUnmount() {
            document.removeEventListener('click', this.documentClickListener);
        },
    }),
    withHandlers({
        onClick: ({ setOpen, open }) => () => {
            setOpen(!open);
        },
    }),
)(PopupMenu);
