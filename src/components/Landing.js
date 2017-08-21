import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import RaisedButton from 'material-ui/RaisedButton';
import typography from 'material-ui/styles/typography';
import muiThemeable from 'material-ui/styles/muiThemeable';

import getWidth, { widths } from '../utils/getWidth';

const Hero = styled.div`
	background-color: ${props => props.muiTheme.palette.primary1Color};
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
	color: ${props => props.muiTheme.palette.primary3Color};
	font-size: ${props => (props.wide ? '56px' : '32px')};
	margin-bottom: 0px;
	padding-bottom: 0px;
`;

const HeroH2 = styled.h2`
	font-weight: ${typography.fontWeightLight};
	color: ${props => props.muiTheme.palette.primary3Color};
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
	padding-top: ${props => (props.wide ? '16px' : '0px')};
	border-radius: 20px;
	border: 3px solid white;
`;

class Landing extends Component {
	render() {
		const wide = getWidth() === widths.large;
		const muiTheme = this.props.muiTheme;

		return (
			<Hero muiTheme={muiTheme}>
				<HeroTitle wide={wide}>
					<BookLogo src="/book-icon.png" wide={wide} />
					<HeroH1 wide={wide} muiTheme={muiTheme}>
						Flybrary
					</HeroH1>
					<HeroH2 wide={wide} muiTheme={muiTheme}>
						A bookshelf management app written in React with Material-UI &
						styled-components
					</HeroH2>
					<RaisedButton
						className="landing-button"
						label="See my shelves"
						onClick={this.handleTouchTapDemo}
						style={{ margin: '16px 32px 0px 32px' }}
						labelStyle={{ color: muiTheme.palette.primary1Color }}
						containerElement={<Link to="/shelves" />}
					/>
					<RaisedButton
						className="landing-button"
						label="Search for books"
						onClick={this.handleTouchTapDemo}
						style={{ margin: '16px 32px 0px 32px' }}
						labelStyle={{ color: muiTheme.palette.primary1Color }}
						containerElement={<Link to="/search" />}
					/>
				</HeroTitle>
			</Hero>
		);
	}
}

export default muiThemeable()(Landing);
