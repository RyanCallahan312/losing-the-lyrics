import React from 'react';
import Active from '../../images/microphone-enabled.svg';
import Disabled from '../../images/microphone-disabled.svg';

export default function Microphone({ disabled, height, width }) {
	if (!height) {
		height = 'auto';
	}
	return (
		<div style={{ height: height, width: width }}>
			{disabled ? <Disabled /> : <Active />}
		</div>
	);
}
