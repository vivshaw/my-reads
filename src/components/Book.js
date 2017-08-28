// @flow

// Vendor
import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import styled from 'styled-components';

// Material-UI
import {
	Card,
	CardActions,
	CardMedia,
	CardTitle,
	CardText
} from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

// Utils/Common
import { getRating, setRating } from '../utils/RatingsAPI';
import type { BookType } from '../common/flowTypes';
import { shelfData } from '../common/commonData';

// Images
import defaultThumb from '../default-thumbnail.png';

/* ------------------------------------------------------------------
   ----------------------------- STYLES -----------------------------
	 ------------------------------------------------------------------ */

/** A Material-UI Card extended with flexbox grid styles */
const FlybraryBook = styled(Card)`
	flex-grow: 1;
	flex-shrink: 0;
	margin: 0 10px 12px;
	max-width: 400px;
	min-width: 300px;
	width: 90vw;
`;

/** A wrapper to align the star ratings with the other elements */
const RatingWrapper = styled.div`
	float: right;
	margin-bottom: 0px;
	margin-top: 20px;
	padding-bottom: 0px;
`;

/* ------------------------------------------------------------------
   --------------------------- COMPONENT ----------------------------
	 ------------------------------------------------------------------ */

type Props = {
	book: BookType,
	handleShelfUpdate: (BookType, string) => void,
	findShelf: string => string
};

/**
 * View component for an individual book
 * @param {Object} book	the book to display
 * @param {function(string, string)} handleShelfUpdate from {@link App#handleShelfUpdate}
 * @param {function(string)} findShelf from {@link App#findShelf}
 */
class Book extends Component {
	props: Props;

	state = {
		shelf: '',
		rating: 0
	};

	/**
	 * Handles an update to a book's shelf by first calling the BooksAPI's update
	 * method, then updating the app's own state.
	 * @param  {SyntheticEvent} event 	Event passed by Material-UI dropdown
	 * @param  {number} 				index 	Index of the selected dropdown item
	 * @param  {string} 				shelf 	The selected shelf
	 */
	handleChangeShelf = (event: SyntheticEvent, index: number, shelf: string) => {
		const { book, handleShelfUpdate } = this.props;
		this.setState({ shelf });
		handleShelfUpdate(book, shelf);
	};

	/**
	 * Updates the rating for a book
	 * @param  {number} rating 		The new rating
	 */
	handleChangeRating = (rating: number) => {
		const { book: { id } } = this.props;
		setRating(id, rating);
		this.setState({ rating });
	};

	componentDidMount() {
		const { book, findShelf } = this.props;
		const rating = getRating(book.id);
		const shelf = book.shelf || findShelf(book.id);

		this.setState({ shelf, rating });
	}

	render() {
		const { book: { id, title, subtitle, description, authors } } = this.props;
		const { rating, shelf } = this.state;

		// if the book lacks imageLinks.thumbnail, use a default thumbnail
		const thumbnail =
			this.props.book.imageLinks && this.props.book.imageLinks.thumbnail
				? this.props.book.imageLinks.thumbnail
				: defaultThumb;

		// Map shelfData into MenuItems for our shelf dropdown
		const shelfDropdownItems = shelfData.maybeShelves.map(shelf => {
			return (
				<MenuItem
					key={shelf + '-opt'}
					value={shelf}
					primaryText={shelfData[shelf].wide}
				/>
			);
		});

		return (
			<FlybraryBook className="book">
				<CardMedia
					overlay={<CardTitle title={title} subtitle={subtitle} />}
					style={{ maxHeight: '400px', overflow: 'hidden' }}
				>
					<img src={thumbnail} alt={title} />
				</CardMedia>
				{authors && <CardTitle subtitle={authors.join(', ')} />}
				{description &&
					<CardText>
						{description.substring(0, 140) + '...'}
					</CardText>}
				<CardActions>
					Shelf:
					<DropDownMenu value={shelf} onChange={this.handleChangeShelf}>
						{shelfDropdownItems}
					</DropDownMenu>
					<RatingWrapper>
						<StarRatingComponent
							name={id + '-rating'}
							value={rating}
							onStarClick={newRating => this.handleChangeRating(newRating)}
						/>
					</RatingWrapper>
				</CardActions>
			</FlybraryBook>
		);
	}
}

export default Book;
