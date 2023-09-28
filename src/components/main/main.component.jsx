import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import { getArticlesAPI, updateArticleAPI } from "../../store/articles/article.action";
import PostalModal from "../postal-model/postal-model.component";
import { Container,ShareBox,Content,Article,SharedActor,SharedImage,Description,SocialActions,SocialCount } from "./main.styles";


function Main(props) {
	const [showModal, setShowModal] = useState("close");

	useEffect(() => {
		props.getArticles();
	}, []);



	const clickHandler = (event) => {
		event.preventDefault();
		if (event.target !== event.currentTarget) {
			return;
		}
		switch (showModal) {
			case "open":
				setShowModal("close");
				break;
			case "close":
				setShowModal("open");
				break;
			default:
				setShowModal("close");
				break;
		}
	};

	function likeHandler(event, postIndex, id) {
		event.preventDefault();
		let currentLikes = props.articles[postIndex].likes.count;
		let whoLiked = props.articles[postIndex].likes.whoLiked;
		let user = props.user.email;
		let userIndex = whoLiked.indexOf(user);

		if (userIndex >= 0) {
			currentLikes--;
			whoLiked.splice(userIndex, 1);
		} else if (userIndex === -1) {
			currentLikes++;
			whoLiked.push(user);
		}

		const payload = {
			update: {
				likes: {
					count: currentLikes,
					whoLiked: whoLiked,
				},
			},
			id: id,
		};

		props.likeHandler(payload);
	}

	return (
		<Container>
			<ShareBox>
				<div> 
					{props.user && props.user.photoURL ? <img src={props.user.photoURL} alt="" /> :<img src="/images/user.svg" alt="" />}
					<button onClick={clickHandler} disabled={props.loading ? true : false}>
						Start a post
					</button>
				</div>
				<div>
					<button>
						<img src="/images/photo-icon.svg" alt="" />
						<span>Photo</span>
					</button>
					<button>
						<img src="/images/video-icon.svg" alt="" />
						<span>Video</span>
					</button>
					<button>
						<img src="/images/event-icon.svg" alt="" />
						<span>Event</span>
					</button>
					<button>
						<img src="/images/article-icon.svg" alt="" />
						<span>Write article</span>
					</button>
				</div>
			</ShareBox>
			<Content>
				{props.loading && <img src="/images/spin-loader.gif" alt="" />}
				{props.articles.length > 0 &&
					props.articles.map((article, key) => (
						<Article key={key}>
							<SharedActor>
								<a>
									{article.actor.image ? <img src={article.actor.image} alt="" /> : <img src="/images/user.svg" alt="" />}
									<div>
										<span>{article.actor.title}</span>
										<span>{article.actor.description}</span>
										<span>{article.actor.date.toDate().toLocaleDateString()}</span>
									</div>
								</a>
								<button>
									<img src="/images/ellipses.svg" alt="" />
								</button>
							</SharedActor>
							<Description>{article.description}</Description>
							<SharedImage>
								<a>{!article.sharedImg && article.video ? <ReactPlayer width={"100%"} url={article.video} /> : article.sharedImg && <img src={article.sharedImg} alt="" />}</a>
							</SharedImage>
							<SocialCount>
								{props.articles[key].likes.count > 0 && (
									<>
										<li>
											<button>
												<img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="" />
												{/* <img src="https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97" alt="" /> */}
												<span>{props.articles[key].likes.count}</span>
											</button>
										</li>
										<li>
											<a>{article.comments} comments (currently not working)</a>
										</li>
									</>
								)}
							</SocialCount>
							<SocialActions>
								<button onClick={(event) => likeHandler(event, key, props.ids[key])} className={props.articles[key].likes.whoLiked.indexOf(props.user.email) >= 0 ? "active" : null}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="rgba(0, 0, 0, 0.6)" width="24" height="24" focusable="false">
										<path d="M19.46 11l-3.91-3.91a7 7 0 01-1.69-2.74l-.49-1.47A2.76 2.76 0 0010.76 1 2.75 2.75 0 008 3.74v1.12a9.19 9.19 0 00.46 2.85L8.89 9H4.12A2.12 2.12 0 002 11.12a2.16 2.16 0 00.92 1.76A2.11 2.11 0 002 14.62a2.14 2.14 0 001.28 2 2 2 0 00-.28 1 2.12 2.12 0 002 2.12v.14A2.12 2.12 0 007.12 22h7.49a8.08 8.08 0 003.58-.84l.31-.16H21V11zM19 19h-1l-.73.37a6.14 6.14 0 01-2.69.63H7.72a1 1 0 01-1-.72l-.25-.87-.85-.41A1 1 0 015 17l.17-1-.76-.74A1 1 0 014.27 14l.66-1.09-.73-1.1a.49.49 0 01.08-.7.48.48 0 01.34-.11h7.05l-1.31-3.92A7 7 0 0110 4.86V3.75a.77.77 0 01.75-.75.75.75 0 01.71.51L12 5a9 9 0 002.13 3.5l4.5 4.5H19z"></path>
									</svg>
									<span>Like</span>
								</button>
								<button>
									<img src="/images/comment-icon.svg" alt="" />
									<span>Comment</span>
								</button>
								<button>
									<img src="/images/share-icon.svg" alt="" />
									<span>Share</span>
								</button>
								<button>
									<img src="/images/send-icon.svg" alt="" />
									<span>Send</span>
								</button>
							</SocialActions>
						</Article>
					))}
			</Content>
			<PostalModal showModal={showModal} clickHandler={clickHandler} />
		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
		loading: state.articleState.loading,
		articles: state.articleState.articles,
		ids: state.articleState.ids,
	};
};

const mapDispatchToProps = (dispatch) => ({
	getArticles: () => dispatch(getArticlesAPI()),
	likeHandler: (payload) => dispatch(updateArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);