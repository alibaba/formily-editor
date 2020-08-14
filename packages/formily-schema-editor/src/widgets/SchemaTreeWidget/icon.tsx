import React from 'react';
// import { IAddIconProps } from './types';

const AddIcon: React.FC<any> = ({ onClick }) => {
	return (
		<i onClick={onClick} style={{ fontSize: '12px' }} className="iconfont icon-shu-diankai" />
	)
}

export default AddIcon