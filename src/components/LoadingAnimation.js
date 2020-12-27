import React from "react"

function LoadingAnimation() {
	
	return (
		<div className="loading-animation-container">
			<main className="loading-animation">
				<div class="lds-ellipsis">
					<div></div><div></div><div></div><div></div>
				</div>
			</main>
		</div>
	)
}

export default LoadingAnimation