import React from 'react';

export default props => {
	const {
		loading,
		showPrevBtn,
		showNextBtn,
		handlePrevClick,
		handleNextClick,
		query
	} = props;
	return (
		<div className='nav-btn-container'>
			<button
				className={`nav-btn 
					${showPrevBtn && query ? 'show' : 'hide'}
					${loading ? 'disabled' : ''}`}
				onClick={handlePrevClick}
			>
				Prev
			</button>
			<button
				className={`nav-btn 
					${showNextBtn && query ? 'show' : 'hide'}
					${loading ? 'disabled' : ''}
					`}
				onClick={handleNextClick}
			>
				Next
			</button>
		</div>
	);
};
