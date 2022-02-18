import React from 'react';
//up
//para um valor da input temos o props.value
//E quando a input mudar nos queremos que o state value atualize por isso criamos o Onchange
//para pegarmos o valor da input é event.target.value
//up
const SearchBox = (props) => {
	return (
		<div className='col col-sm-4'>
			<input
				className='form-control'
				value={props.value}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder='Type to search any movie...'
			></input>
		</div>
	);
};

export default SearchBox;
