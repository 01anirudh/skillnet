import styled from "styled-components";

export const Container = styled.div`
	grid-area: left;
`;

export const ArtCard = styled.div`
	text-align: center;
	overflow: hidden;
	margin-bottom: 8px;
	border-radius: 5px;
	background-color: #fff;
	transition: box-shadow 83ms;
	position: relative;
	border: none;
	box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

export const UserInfo = styled.div`
	border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	padding: 12px 12px 16px;
	word-wrap: break-word;
	word-break: break-word;
`;

export const CardBackground = styled.div`
	background: url("/images/card-bg.svg");
	background-position: center;
	background-size: 462px;
	height: 54px;
	margin: -12px -12px 0;
`;

export const Photo = styled.div.attrs((props) => ({
	$photourl: props.photourl,
  }))`
	box-shadow: none;
	background: url(${props => props.$photourl});
	width: 72px;
	height: 72px;
	box-sizing: border-box;
	background-clip: content-box;
	background-color: #fff;
	background-position: center;
	/* background-size: 60%; */
	background-repeat: no-repeat;
	border: 2px solid white;
	margin: -38px auto 12px;
	border-radius: 50%;
`;

export const Link = styled.div`
	font-size: 16px;
	line-height: 1.5;
	color: rgba(0, 0, 0, 0.9);
	font-weight: 600;
`;

export const AddPhotoText = styled.div`
	color: #0a66c2;
	margin-top: 4px;
	font-size: 12px;
	line-height: 1.33;
	font-weight: 400;
`;

export const Widget = styled.div`
	border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	padding: 12px 0;
	& > a {
		text-decoration: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 4px 12px;
		&:hover {
			background-color: rgba(0, 0, 0, 0.08);
		}
		div {
			display: flex;
			flex-direction: column;
			text-align: left;
			span {
				font-size: 12px;
				line-height: 1.333;
				&:first-child {
					color: rgba(0, 0, 0, 0.6);
				}
				&:nth-child(2) {
					color: #000;
				}
			}
		}
	}
`;

export const Item = styled.a`
	display: block;
	border-color: rgba(0, 0, 0, 0.6);
	text-align: left;
	padding: 12px;
	font-size: 12px;
	span {
		display: flex;
		align-items: center;
	}
	&:hover {
		background-color: rgba(0, 0, 0, 0.08);
	}
`;

export const CommunityCard = styled(ArtCard)`
	padding: 8px 0 0;
	text-align: left;
	display: flex;
	flex-direction: column;
	a {
		color: #000;
		padding: 4px 12px;
		font-size: 12px;
		&:hover {
			color: #0a66c2;
		}
		span {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		&:last-child {
			color: rgba(0, 0, 0, 0.6);
			border-top: 1px solid #d6cec2;
			padding: 12px;
			&:hover {
				background-color: rgba(0, 0, 0, 0.08);
			}
		}
	}
`;