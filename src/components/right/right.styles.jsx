import styled from "styled-components";


export const Container = styled.div`
	grid-area: right;
	@media (max-width: 768px) {
		margin-bottom: 35px;
	}
`;

export const FollowCard = styled.div`
	text-align: center;
	overflow: hidden;
	margin-bottom: 8px;
	background-color: #fff;
	border-radius: 5px;
	border: none;
	position: relative;
	box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
	padding: 12px;
`;

export const Title = styled.div`
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	font-size: 16px;
	width: 100%;
	color: rgba(0, 0, 0, 0.6);
`;

export const FeedList = styled.ul`
	margin-top: 16px;
	li {
		display: flex;
		align-items: center;
		margin: 12px 0;
		position: relative;
		font-size: 14px;
		& > div {
			display: flex;
			flex-direction: column;
		}
		button {
			background-color: transparent;
			color: rgba(0, 0, 0, 0.6);
			box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
			padding: 16px;
			align-items: center;
			border-radius: 15px;
			box-sizing: border-box;
			font-weight: 600;
			display: inline-flex;
			justify-content: center;
			max-height: 32px;
			max-width: 480px;
			text-align: center;
			border: none;
		}
	}
`;

export const Avatar = styled.div`
	background: url("https://static-exp1.licdn.com/sc/h/1b4vl1r54ijmrmcyxzoidwmxs");
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
	width: 48px;
	height: 48px;
	margin-right: 8px;
`;

export const Recommendation = styled.a`
	display: flex;
	align-items: center;
	font-size: 14px;
	color: #0a66c2;
	img {
		margin-left: 5px;
	}
`;

export const BannerCard = styled(FollowCard)`
	img {
		width: 100%;
		height: 100%;
	}
`