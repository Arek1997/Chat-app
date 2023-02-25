import React from 'react';

const LoadingSpinner = () => {
	return (
		<div className='absolute inset-0 z-[1] grid place-content-center bg-sky-700/60 backdrop-blur-[2px]'>
			<img className='w-28' src='/spinner.svg' alt='Loading spinner' />
		</div>
	);
};

export default LoadingSpinner;
