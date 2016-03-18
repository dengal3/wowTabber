import React from 'react';

export default class TabItem extends React.Component {
    constructor(props) {
        super(props);
        this.activateTab = this.activateTab.bind(this);
    }

    activateTab(e) {
        e.stopPropagation();
        chrome.tabs.get(this.props.id, (tab) => {
            chrome.tabs.highlight({
                "tabs": tab.index
            }, (windowId) => {});
        })
    }

    render() {
        var title = this.props.title;
        var key= this.props.key;
        title = title.length > 20 ? title.substr(0, 20)+"..." : title;
        return (
            <li className="tab-item" onClick={this.activateTab}>
                <div className="tab-favicon">
                    <img src={this.props.favIconUrl} />
                </div>
                {title}
            </li>
        )
    }
}