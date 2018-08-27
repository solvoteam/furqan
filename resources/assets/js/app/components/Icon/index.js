import React, { Component } from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

class Icon extends Component {
    render() {
        const { name, width, height, onClick, color } = this.props;
        const className = classNames('icon', this.props.className);

        return (
            <svg
                id={name}
                onClick={onClick}
                className={className}
                height={height}
                width={width}
                {...this.props}>
                <use fill={color} xlinkHref={`#${name}`} />
            </svg>
        );
    }
}

Icon.propTypes = {
    className: propTypes.string,
    name: propTypes.string,
};

Icon.defaultProps = {
    width: '24',
    height: '24',
    color: '',
};

export default Icon;
