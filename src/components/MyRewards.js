import React, { Component } from 'react'
import blogUtils from '../utils/blogUtils'

export class MyRewards extends Component {
    render() {
        if (blogUtils.networkId !== 80001) {
            return <p>Please connect to the Matic Mumbai network.</p>
        }
        return (
            <div>
                <p>Coming soon..</p>
            </div>
        )
    }
}

export default MyRewards