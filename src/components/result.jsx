import React from 'react';

export default props => {
	const { hit } = props;
	return (
		<article className='article'>
			<div className='row'>
				<a className='title' href={hit.url}>
					<h3>{hit.title}</h3>
				</a>
				<a className='url' href={hit.url}>
					{hit.url}
				</a>
			</div>
			<div className='row'>
				<span className='info'>Number of points: {hit.points}</span>
				<span className='info'>Author: {hit.author}</span>
				<span className='info'>Date: {hit.created_at}</span>
				<span className='info'>Comments: {hit.num_comments}</span>
			</div>
		</article>
	);
};
