// @flow

// Vendor
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Material-UI components
import Button from "@material-ui/core/Button";

// Utils/Common
import logo from "../book-icon.png";
import { flybraryTheme } from "./App";

/* ------------------------------------------------------------------
   ----------------------------- STYLES -----------------------------
	 ------------------------------------------------------------------ */

/** A colored full-wdth container block */
const Block = (color) => styled.div`
  /* Positioning & Box Model */
  margin-bottom: 0px;
  margin-top: 0px;
  padding-bottom: 32px;
  /* Color */
  background-color: ${color};
`;

const BlockOrange = Block(flybraryTheme.palette.primary1Color);
const BlockGrey = Block(flybraryTheme.palette.primary2Color);
const BlockWhite = Block(flybraryTheme.palette.primary3Color);

/** A container block for centering the hero titles */
const HeroTitle = styled.div`
  /* Positioning & Box Model */
  margin: 0px auto 0px auto;
  max-width: 570px;
  /* Text */
  text-align: center;
`;

/** Styled H1 text for the hero */
const HeroH1 = (color) => styled.h1`
  /* Positioning & Box Model */
  margin-bottom: 0px;
  margin-top: 0px;
  padding-bottom: 0px;
  padding-top: 30px;
  /* Text */
  font-weight: ${flybraryTheme.typography.fontWeightLight};
  /* Color */
  color: ${color};

  /* Media */
  @media (min-width: 992px) {
    font-size: 56px;
  }
  @media (max-width: 991px) {
    font-size: 32px;
  }
`;

const HeroH1Lt = HeroH1(flybraryTheme.palette.primary3Color);
const HeroH1Dk = HeroH1(flybraryTheme.palette.text);

/** Styled H2 text for the hero */
const HeroH2 = (color) => styled.h2`
  /* Positioning & Box Model */
  margin-bottom: 0px;
  margin-top: 0px;
  /* Text */
  font-weight: ${flybraryTheme.typography.fontWeightLight};
  letter-spacing: 0;
  /* Color */
  color: ${color};

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

const HeroH2Lt = HeroH2(flybraryTheme.palette.primary3Color);
const HeroH2Dk = HeroH2(flybraryTheme.palette.text);

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

/** A container block for centering the landing titles */
const LandingContent = styled.div`
  /* Positioning & Box Model */
  margin: 0px auto 0px auto;
  max-width: 750px;
  /* Text */
  text-align: center;
`;

/** Landing site footer */
const Footer = styled.div`
  /* Positioning & Box Model */
  height: 30px;
  line-height: 30px;
  position: absolute;
  width: 100%;
  /* Text */
  text-align: center;
  /* Color */
  background-color: ${flybraryTheme.palette.primary2Color};
`;

// These are in an object because they need to be passed to Material-UI style props
const styles = {
  link: { textDecoration: "none", color: "#26C6DA" },
  button: {
    margin: "16px 32px 0px 32px",
    color: flybraryTheme.palette.primary1Color,
    backgroundColor: flybraryTheme.palette.primary3Color,
    borderRadius: 0,
  },
};

/* ------------------------------------------------------------------
   --------------------------- COMPONENT ----------------------------
	 ------------------------------------------------------------------ */

/** Landing page component, located at route / */
const Landing = () => (
  <div>
    <BlockOrange>
      <HeroTitle>
        <BookLogo src={logo} />
        <HeroH1Lt>Flybrary</HeroH1Lt>
        <HeroH2Lt>
          A library management app written in React with Material-UI &
          styled-components
        </HeroH2Lt>
        <Button
          variant="contained"
          className="landing-button"
          style={styles.button}
          labelStyle={styles.label}
          containerElement={<Link to="/shelves" />}
        >
          See my shelves
        </Button>
        <Button
          variant="contained"
          className="landing-button"
          style={styles.button}
          labelStyle={styles.label}
          containerElement={<Link to="/search" />}
        >
          Search for books
        </Button>
      </HeroTitle>
    </BlockOrange>

    <BlockGrey>
      <LandingContent>
        <HeroH2Dk>
          Flybrary is a library app built for Project #1 of the{" "}
          <a
            href="https://www.udacity.com/course/react-nanodegree--nd019"
            style={styles.link}
          >
            Udacity React Nanodegree
          </a>
          . It lets users{" "}
          <Link to="/search" style={styles.link}>
            search
          </Link>{" "}
          for books, add them to{" "}
          <Link to="/shelves" style={styles.link}>
            shelves
          </Link>
          , rate them, and{" "}
          <Link to="/move" style={styles.link}>
            move
          </Link>{" "}
          them in bulk.
        </HeroH2Dk>
      </LandingContent>
    </BlockGrey>

    <BlockWhite>
      <LandingContent>
        <HeroH1Dk>How does it work?</HeroH1Dk>
        <HeroH2Dk>
          Flybrary is a progressive web app built on{" "}
          <a
            href="https://github.com/facebookincubator/create-react-app"
            style={styles.link}
          >
            create-react-app
          </a>{" "}
          and{" "}
          <a href="https://reacttraining.com/react-router/" style={styles.link}>
            react-router
          </a>{" "}
          for our logic, styled-components and Material UI for our themeing,
          alongside a bonanza of lovely zero-config React libraries such as
          react-loadable and react-snapshot. Flybrary supports code splitting,
          static pre-rendering, and offline use.
        </HeroH2Dk>
      </LandingContent>
    </BlockWhite>

    <Footer>
      built with{" "}
      <span role="img" aria-label="heart emoji">
        ♥️
      </span>{" "}
      in{" "}
      <a href="https://facebook.github.io/react/" style={styles.link}>
        React
      </a>{" "}
      / fork me{" "}
      <a href="https://github.com/vivshaw/my-reads" style={styles.link}>
        on GitHub
      </a>
    </Footer>
  </div>
);

export default Landing;
