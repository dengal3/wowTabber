import React from 'react';
import TabItem from './TabItem.js';


export default class Tab extends React.Component {
    // same as ComponentWillMount
    constructor(props) {
        super(props);

        // set tabsInfo
        this.state = {
            tabsInfo: []
        }
        this.getAllTabs = this.getAllTabs.bind(this);
    }

    componentDidMount() {
        // get all tabs' info
       this.getAllTabs();
    }

    getAllTabs() {
        var isEmpty = !localStorage.getItem("tabsInfo");

        if (isEmpty) {
            chrome.tabs.query({}, (data) => {
                console.log(data);
                localStorage.setItem("tabsInfo", JSON.stringify(data));
                this.setState({
                    tabsInfo: data
                });
            });
        } else {
            this.setState({
                tabsInfo: JSON.parse(localStorage.getItem("tabsInfo"))
            })
        }
    }

    render() {
        var tabListContent = this.state.tabsInfo.map((tab, i) => {
            return (
                    <TabItem {...tab} key={tab.id} index={i}/>
                )
        })

        if (tabListContent.length) {
            return (
                <ul className="tab-list">
                    {tabListContent}
                </ul>
            )
        } else {
            return (
                    <span>Loading...</span>
                )
        }
    }
}