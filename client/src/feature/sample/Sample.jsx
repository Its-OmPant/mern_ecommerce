import React from "react";
import { increment } from "./sampleSlice";
import { useSelector, useDispatch } from "react-redux";

function Sample() {
	const dispatch = useDispatch();
	const value = useSelector((state) => state.sampleState.value);
	return (
		<div className="my-4 p-4 w-full ">
			<div>Sample value: {value}</div>
			<button
				className="p-2 mt-2 rounded-md bg-sky-100"
				onClick={() => dispatch(increment())}
			>
				Increment Value
			</button>
		</div>
	);
}

export default Sample;
