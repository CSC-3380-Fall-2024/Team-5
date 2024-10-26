import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Tracks what tab is active */
class Tab extends React.Component<{}, {[label: string, activeTab:string}> {
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,

    };

    onClick = () => {
    const {label, onClick} = this.props;
    onClick(label);
};

render() {
    const{
        onClick,
        props: {
            activeTab,
            label,

        },
    } = this;

    let className = 'tab-list-item';
    if (activeTab === label) {
        className += 'tab-list-active';
    }

    return (
        <li
            className={className}
            onClick={onClick}
            >
                {label}
            </li>
        );
    }
}

export default Tab;
