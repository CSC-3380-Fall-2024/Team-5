import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "../CSS Files/remote.css";
import Tab from './TabTracker';
/* Creates Tabs */
class Tabs extends Component {
    static propTypes = {
      children: PropTypes.instanceOf(Array).isRequired,
    }
  
  
  constructor(props){
    
    super(props);
  
    this.state = {
      activeTab: this.props.children[0].props.label,
    };
  }

  onClickTab = (tab) => {
    this.setState({activeTab: tab});
  }

  render() {
    const {
      onClickTab,
      props: {
        children,
      },
      state: {
        activeTab,
      }
    } = this;

  return (
    <div className="tabs">
        <ol className="tab-list">
            {children.map((child) => {
                const { label } = child.props;
                return (
                    <Tab
                        activeTab = {activeTab}
                        key = {label}
                        label = {label}
                        onClick = {onClickTab}
                    />
                );

   })}
   </ol>
   <div className = "tab-content">
    {children.map((child) => {
        if (child.props.label !== activeTab) return undefined;

  })}
   </div>
</div>
  );
}

}
export default Tabs;