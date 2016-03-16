import React from 'react';

export default class TabItem extends React.Component {
    constructor(props) {
        super(props);
        this.activateTab = this.activateTab.bind(this);
    }

    activateTab(e) {
        var _this = this;
        e.stopPropagation();
        
        chrome.tabs.highlight({
                tabs: _this.props.index
        }, (windowId) => {});
    }

    closeTab() {
        var _this = this;
        chrome.tabs.remove({
            tabs: _this.props.index
        }, (windowId) => {});
    }

    render() {
        var title = this.props.title;
        title = title.length > 15 ? title.substr(0, 15)+"..." : title;
        return (
            <li className="tab-item" onClick={this.activateTab}>
                {title}
                <span className="close" onClick={this.closeTab} >close</span>
            </li>
        )
    }
}