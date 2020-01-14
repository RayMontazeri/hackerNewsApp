import React from 'react';
import Result from './result';

export default props => {
	const { results } = props;
	if (Object.keys(results).length && results.length) {
		return (
			<div>
				{results.map(hit => {
					return <Result key={hit.object_id} hit={hit} />;
				})}
			</div>
		);
	} else {
		return null;
	}
};
