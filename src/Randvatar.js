/* eslint-disable */
import React, { Component } from 'react';
import Gravatar from 'react-gravatar';
import md5 from "react-native-md5";
/* eslint-enable */


export default class Randvatar extends Component {
	render() {
		return (
			<Gravatar email={md5.hex_md5(this.props.reddit)}/>
		);
	}
}