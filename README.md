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
- [Documentation](#documentation)
- [To-Do](#to-do)

## What

This is my submission for Project 1 of the [Udacity React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019). Flybrary
is a LibraryThing-esque library management app that keeps track of what books
you're reading. The app uses React & react-router to build an SPA front-end for
a RESTful books API. It can search for books, add books to shelves, rate them, and move
them between shelves. It has a responsive, mobile-first style built with Material-UI
and styled-components that should look equally great on mobile, tablet, or desktop.
It uses react-loadable for code splitting and react-snapshot for static prerendering.

[A live demo is available here](https://my-reads-vivshaw.herokuapp.com/).

## Installing

Installation should be a breeze, as this was built with create-react-app & requires
nothing more than

```
npm install
npm start
```

## Testing

The app has a full test suite written in Jest & Enzyme that can be run
with `npm run test`. A coverage report can be generated with `npm run test -- --coverage`.
The repo has CI set up with CircleCI & Codeclimate that will
automagically run the test suite & generate a coverage report on each git push.

## Deployment

The app has continuous deployment to Heroku on each successful (CI-passing) build of the
master branch. The latest passing build is at [my-reads-vivshaw.herokuapp.com](https://my-reads-vivshaw.herokuapp.com/).

For manual deployment, you can `npm run build`, and then deploy the built app on
any webserver of your choice.

## Documentation

Flybrary is [fully documented](https://vivshaw.github.io/my-reads/) with JSDoc, and some [documentation.js](http://documentation.js.org/)-generated docs are hosted from the docs directory and are [available here](https://vivshaw.github.io/my-reads/). Unfortunately, the auto-generated docs aren't very good due to the lack of a good ESNext-compatible docs library. It was impossible to use JSDoc or ESDoc due to compatibility problems with certain ES6/ES7 features, and even documentation.js required a Babel transpilation step to get it working & does some weird things with my output. Regardless, the JSDoc in the source itself should be unambiguous.

To regenerate docs, use `npm run docs`.

## To-Do

- Eventually, I'd like to migrate to a Redux architecture.
- I also have a couple Webpack bugs that I don't think I can fully resolve without ejecting and manually reconfiguring.
- There are a number of performance optimizations that I could tend to.
- Visual style could be spruced up
- The test suites are messy & incomplete, in large part due to a) many difficulties working with Material-UI in Jest and b) some trouble injecting mocks. Solving either of these could increase coverage & tidy things up.
