import React from 'react';
import TabItem from './TabItem.js';

export default class Tab extends React.Component {
    // same as ComponentWillMount
    constructor(props) {
        super(props);

        // get tabsInfo
        // first time return [], else return localStorage
        var tabsInfo = localStorage.getItem("tabsInfo") ? JSON.parse(localStorage.getItem("tabsInfo")) : [];
        // set tabsInfo
        this.state = {
            tabsInfo: tabsInfo
        }
        // get all tabs' info
        if (!this.state.tabsInfo.length)
            this.queryAllTabs();

        chrome.tabs.onHighlighted.addListener( (activeInfo) => {
            console.log(activeInfo);
            var temp = JSON.parse(localStorage.getItem("tabsInfo"));
            var targetIndex = -1;
            targetIndex = temp.forEach( (info, index) => {
                if (info.id === activeInfo.tabIds[0]) {
                    return index;
                }
            });

            if (targetIndex == -1) {
                temp = [activeInfo].concat(temp);
            } else {
                temp = [activeInfo].concat(temp.splice(targetIndex, 1));
            }

            localStorage.setItem('tabsInfo', JSON.stringify(temp));
            this.setState({tabsInfo: temp});
        });
    }

    queryAllTabs() {
        var pro = new Promise((resolve, reject) => {
            chrome.tabs.query({}, resolve);
        })

        pro.then((data) => {
            console.log(data);
            localStorage.setItem("tabsInfo", JSON.stringify(data));
            this.setState({tabsInfo: data});
        })
    }

    render() {
        var tabListContent = this.state.tabsInfo.map((tab, i) => {
            return (
                    <TabItem key={tab.id} {...tab}/>
                )
        })

        return (
            <ul className="tab-list">
                {tabListContent}
            </ul>
        )
    }
}