import React from 'react';
import Ionicon from 'react-ionicons'

const Loading = (props) => {
    console.log("loading");
    const loading = props => (

        <div className="interactions">

            {props.isLoading &&

            <Ionicon icon="ios-ionic-outline" fontSize="60px" color="#347eff" width="100%" textAlign="center" rotate={true}/>
            }
        </div>

    );
    return <div className="articlesContainer">{loading}</div>
}

export default Loading;