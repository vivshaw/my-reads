<h1 align="center">Flybrary</h1>
<p align="center">A bookshelf management app written in React with Material-UI & styled-components</p>

[![CircleCI](https://circleci.com/gh/vivshaw/my-reads.svg?&style=shield)](https://circleci.com/gh/vivshaw/my-reads)
[![Code Climate](https://codeclimate.com/github/vivshaw/my-reads/badges/gpa.svg)](https://codeclimate.com/github/vivshaw/my-reads) [![Test Coverage](https://codeclimate.com/github/vivshaw/my-reads/badges/coverage.svg)](https://codeclimate.com/github/vivshaw/my-reads/coverage)
[![Live Demo](https://img.shields.io/badge/live%20demo-active-blue.svg)](https://my-reads-vivshaw.herokuapp.com/)
[![Docs](https://img.shields.io/badge/docs-documentation.js-ff69b4.svg)](https://vivshaw.github.io/my-reads)

<div align="center"><img src="https://cdn.rawgit.com/vivshaw/my-reads/master/docs/textlogo.svg" alt="flybrary logo" /></div>

## Table of Contents

- [What It Is](#what)
- [Installing](#installing)
- [Testing](#testing)
- [Deploying](#deploying)

## What

This is my submission for Project 1 of the [Udacity React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019). This project
is a LibraryThing-esque library management app that keeps track of what books
you're reading. The app uses React & react-router to build an SPA front-end for
a RESTful books API. It can search for books, add books to shelves, and move
them between shelves. It has a responsive, mobile-first style built with Material-UI and styled-components
that should look equally great on mobile, tablet, or desktop.

[A live demo is available here](https://my-reads-vivshaw.herokuapp.com/).

## Installing
Installation should be a breeze, as this was built with create-react-app & requires
nothing more than

```
yarn install
yarn start
```

or

```
npm install
npm start
```

## Testing
The app has a full test suite written in Jest & Enzyme that can be run
with ```yarn test```. The repo has CI set up with CircleCI & Codeclimate that will
automagically run the test suite & generate a coverage report on each git push.
Plus, sparkly badges! :sparkles:

## Deployment
The app autodeploys to Heroku on each successful (CI-passing) build of the
master branch. The latest passing build is at [my-reads-vivshaw.herokuapp.com](https://my-reads-vivshaw.herokuapp.com/)
