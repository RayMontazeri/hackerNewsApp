import React, { Component } from 'react';
import http from '../services/httpService';
import Loader from '../loader.gif';
import PageNav from './PageNav';
import Results from './results';
import Input from './input';
import config from '../config.json';

class Search extends Component {
	state = {
		query: '',
		results: {},
		loading: false,
		nbHits: 0, //total number of results
		totalPageNo: 0,
		currentPageNo: 0,
		message: ''
		// to show ero ressages
	};

	getPageCount = (nbHits, itemsPerPage) => {
		const divisible = 0 === nbHits % itemsPerPage;
		const addExtraPage = divisible ? 0 : 1;
		return Math.floor(nbHits / itemsPerPage) + addExtraPage;
	};

	fetchSearchResults = async (updatedPageNo = '', query) => {
		const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
		const searchUrl = `${config.apiEndPoint}${query}&page=${pageNumber}`;
		http
			.get(searchUrl)
			.then(res => {
				const total = res.data.nbHits;
				const totalPageNo = this.getPageCount(total, 20);
				const resultsNotFoundMsg =
					res.data.hits.length < 1 ? 'there are no search results' : '';
				this.setState({
					results: res.data.hits,
					message: resultsNotFoundMsg,
					nbHits: total,
					totalPageNo: totalPageNo,
					currentPageNo: updatedPageNo,
					loading: false
				});
			})
			.catch(error => {
				this.setState({
					loading: false,
					message: 'failed to catch the data'
				});
			});
	};

	handleOnInputChange = e => {
		const query = e.target.value;
		// to solve the backspace problem
		if (!query) {
			this.setState({
				query,
				results: {},
				message: ''
			});
		} else {
			this.setState({ query, loading: true, message: '' }, () => {
				this.fetchSearchResults(1, query);
			});
		}
	};

	handlePageClick = type => {
		const updatePageNo =
			'prev' === type
				? this.state.currentPageNo - 1
				: this.state.currentPageNo + 1;

		if (!this.state.loading) {
			this.setState({ loading: true, message: '' }, () => {
				this.fetchSearchResults(updatePageNo, this.state.query);
			});
		}
	};

	render() {
		const {
			query,
			loading,
			message,
			totalPageNo,
			currentPageNo,
			results
		} = this.state;

		// to show the next or not to show the next
		const showPrevBtn = 1 < currentPageNo;
		const showNextBtn = totalPageNo > currentPageNo;

		return (
			<div className='container'>
				<h2 className='heading'>React Application : HackerNews Search API</h2>

				<Input onChange={this.handleOnInputChange} value={query} />

				{/*	Error Message*/}
				{message && <p className='message'>{message}</p>}

				{/*	Loading gif*/}
				<img
					src={Loader}
					className={`search-loading ${loading ? 'show' : 'hide'}`}
					alt='loader'
				/>

				<PageNav
					loading={loading}
					showPrevBtn={showPrevBtn}
					showNextBtn={showNextBtn}
					handlePrevClick={() => this.handlePageClick('prev')}
					handleNextClick={() => this.handlePageClick('next')}
					query={query}
				/>

				<Results results={results} />

				<PageNav
					loading={loading}
					showPrevBtn={showPrevBtn}
					showNextBtn={showNextBtn}
					handlePrevClick={() => this.handlePageClick('prev')}
					handleNextClick={() => this.handlePageClick('next')}
					query={query}
				/>
			</div>
		);
	}
}

export default Search;
