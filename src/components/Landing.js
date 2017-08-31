// @flow

// Vendor
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Material-UI components
import RaisedButton from 'material-ui/RaisedButton';
import typography from 'material-ui/styles/typography';
import muiThemeable from 'material-ui/styles/muiThemeable';

// Utils/Common
import logo from '../book-icon.png';

/* ------------------------------------------------------------------
   ----------------------------- STYLES -----------------------------
	 ------------------------------------------------------------------ */

/** A colored full-wdth container block */
const Block = styled.div`
	/* Positioning & Box Model */
	margin-bottom: 0px;
	margin-top: 0px;
	padding-bottom: 32px;
	/* Color */
	background-color: ${props => props.color};
`;

/** A container block for centering the hero titles */
const HeroTitle = styled.div`
	/* Positioning & Box Model */
	margin: 0px auto 0px auto;
	max-width: 575px;
	/* Text */
	text-align: center;
`;

/** Styled H1 text for the hero */
const HeroH1 = styled.h1`
	/* Positioning & Box Model */
	margin-bottom: 0px;
	margin-top: 0px;
	padding-bottom: 0px;
	padding-top: 30px;
	/* Text */
	font-weight: ${typography.fontWeightLight};
	/* Color */
	color: ${props => props.color};

	/* Media */
	@media (min-width: 992px) {
		font-size: 56px;
	}
	@media (max-width: 991px) {
		font-size: 32px;
	}
`;

/** Styled H2 text for the hero */
const HeroH2 = styled.h2`
	/* Positioning & Box Model */
	margin-bottom: 0px;
	margin-top: 0px;
	/* Text */
	font-weight: ${typography.fontWeightLight};
	letter-spacing: 0;
	/* Color */
	color: ${props => props.color};

	/* Media */
	@media (min-width: 992px) {
		/* Positioning & Box Model */
		padding-top: 26px;
		padding-bottom: 13px;
		/* Text */
		font-size: 24px;
		line-height: 32px;
	}
	@media (max-width: 991px) {
		/* Positioning & Box Model */
		padding-top: 29px;
		padding-bottom: 12px;
		/* Text */
		font-size: 20px;
		line-height: 28px;
	}
`;

/** Styled Flybrary logo image */
const BookLogo = styled.img`
	border-radius: 20px;
	border: 3px solid white;
	max-height: 200px;

	/* Media */
	@media (min-width: 992px) {
		padding-top: 16px;
	}
	@media (max-width: 991px) {
		padding-top: 0px;
	}
`;

/** Landing site footer */
const Footer = styled.div`
	.footer
	/* Positioning & Box Model */
	bottom: 0px;;
	height: 30px;
	line-height: 30px;
	position: absolute;
	width: 100%;
	/* Text */
	text-align: center;
	/* Color */
	background-color: ${props => props.bgColor};
`;

/** Landing page button styles. Label style has to go inline because we only
have access to the theme colors within the component. */
const LandingButton = styled(RaisedButton)`
	margin: '16px 32px 0px 32px';
`;

/* ------------------------------------------------------------------
   --------------------------- COMPONENT ----------------------------
	 ------------------------------------------------------------------ */

/** Landing page component, located at route / */
class Landing extends Component {
	render() {
		const muiTheme = this.props.muiTheme;

		return (
			<div>
				<Block color={muiTheme.palette.primary1Color}>
					<HeroTitle>
						<BookLogo src={logo} />
						<HeroH1 color={muiTheme.palette.primary3Color}>Flybrary</HeroH1>
						<HeroH2 color={muiTheme.palette.primary3Color}>
							A library management app written in React with Material-UI &
							styled-components
						</HeroH2>
						<LandingButton
							className="landing-button"
							label="See my shelves"
							labelStyle={{ color: muiTheme.palette.primary1Color }}
							containerElement={<Link to="/shelves" />}
						/>
						<LandingButton
							className="landing-button"
							label="Search for books"
							labelStyle={{ color: muiTheme.palette.primary1Color }}
							containerElement={<Link to="/search" />}
						/>
					</HeroTitle>
				</Block>

				<Block color={muiTheme.palette.primary2Color}>
					<HeroTitle>
						<HeroH2>
							Flybrary is a library app built for Project #1 of the{' '}
							<a href="https://www.udacity.com/course/react-nanodegree--nd019">
								Udacity React Nanodegree
							</a>. It lets users <Link to="/search">search</Link> for books,
							add them to <Link to="/shelves">shelves</Link>, rate them, and
							move them in bulk.
						</HeroH2>
					</HeroTitle>
				</Block>

				<Block color={muiTheme.palette.primary3Color}>
					<HeroTitle>
						<HeroH1 color={muiTheme.palette.textColor}>
							How does it work?
						</HeroH1>
						<HeroH2>
							Flybrary is a progressive web app built on{' '}
							<a href="https://github.com/facebookincubator/create-react-app">
								create-react-app
							</a>{' '}
							and{' '}
							<a href="https://reacttraining.com/react-router/">
								react-router
							</a>{' '}
							for our logic, styled-components and Material UI for our themeing,
							alongside a bonanza of lovely zero-config React libraries such as
							react-loadable and react-snapshot. Flybrary supports code
							splitting, static pre-rendering, and offline use.
						</HeroH2>
					</HeroTitle>
				</Block>

				<Footer bgColor={muiTheme.palette.primary2Color}>
					built with{' '}
					<span role="img" aria-label="heart emoji">
						♥️
					</span>{' '}
					in <a href="https://facebook.github.io/react/">React</a> / fork me{' '}
					<a href="https://github.com/vivshaw/my-reads">on GitHub</a>
				</Footer>
			</div>
		);
	}
}

export default muiThemeable()(Landing);
