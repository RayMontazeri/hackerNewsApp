import React from 'react';

export default props => {
	const { value, onChange } = props;
	return (
		<label className='search-label' htmlFor='search-input'>
			<input
				type='text'
				name='query'
				value={value}
				id='search-input'
				placeholder='Search...'
				onChange={onChange}
			/>
			<i className='fa fa-search search-icon' aria-hidden='true' />
		</label>
	);
};
