import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';
import spacing from 'material-ui/styles/spacing';
import typography from 'material-ui/styles/typography';
import { deepOrange200, darkWhite } from 'material-ui/styles/colors';

const Hero = styled.div`
	background-color: ${deepOrange200};
	margin-top: 0px;
	padding-bottom: 32px;
`;

const HeroTitle = styled.div`
	margin: 0px auto 0px auto;
	text-align: center;
	max-width: 575px;
`;

const HeroH1 = styled.h1`
	font-weight: ${typography.fontWeightLight};
	color: ${darkWhite};
	font-size: ${props => (props.wide ? '56px' : '32px')};
	margin-bottom: 0px;
	padding-bottom: 0px;
`;

const HeroH2 = styled.h2`
	font-weight: ${typography.fontWeightLight};
	color: ${darkWhite};
	font-size: ${props => (props.wide ? '24px' : '20px')};
	line-height: ${props => (props.wide ? '32px' : '28px')};
	padding-top: ${props => (props.wide ? '16px' : '19px')};
	padding-bottom: ${props => (props.wide ? '13px' : '12px')};
	margin-bottom: 0px;
	margin-top: 0px;
	letter-spacing: 0;
`;

const BookLogo = styled.img`
	max-height: 200px;
	margin-top: 16px;
	border-radius: 20px;
	border: 3px solid white;
`;

class Landing extends Component {
	render() {
		const wide = this.props.width === LARGE;

		return (
			<Hero>
				<HeroTitle wide={wide}>
					<BookLogo src="/book-icon.png" />
					<HeroH1 wide={wide}>Flybrary</HeroH1>
					<HeroH2 wide={wide}>
						A bookshelf management app written in React with Material-UI &
						styled-components
					</HeroH2>
					<RaisedButton
						className="landing-button"
						label="See my shelves"
						onClick={this.handleTouchTapDemo}
						style={{ margin: '16px 32px 0px 32px' }}
						labelStyle={{ color: deepOrange200 }}
						containerElement={<Link to="/shelves" />}
					/>
					<RaisedButton
						className="landing-button"
						label="Search for books"
						onClick={this.handleTouchTapDemo}
						style={{ margin: '16px 32px 0px 32px' }}
						labelStyle={{ color: deepOrange200 }}
						containerElement={<Link to="/search" />}
					/>
				</HeroTitle>
			</Hero>
		);
	}
}

export default withWidth()(Landing);
