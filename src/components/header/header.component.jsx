import { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { getFirestore } from "firebase/firestore";
import { postArticleAPI } from "../../store/articles/article.action";
import { Container,Content,Header,SharedContent,UserInfo,ShareCreation,AttachAsset,AssetButton,ShareComment,PostButton,Editor,UploadImage} from "./header.styles"


function PostalModal(props) {
	const [editorText, setEditorText] = useState("");
	const [imageFile, setImageFile] = useState("");
	const [videoFile, setVideoFile] = useState("");
	const [assetArea, setAssetArea] = useState("");

	const reset = (event) => {
		setEditorText("");
		setImageFile("");
		setVideoFile("");
		setAssetArea("");
		props.clickHandler(event);
	};

	function handleImage(event) {
		let image = event.target.files[0];

		if (image === "" || image === undefined) {
			alert(`Not an image. This file is: ${typeof imageFile}`);
			return;
		}
		setImageFile(image);
	}

	function switchAssetArea(area) {
		setImageFile("");
		setVideoFile("");
		setAssetArea(area);
	}

	function postArticle(event) {
		event.preventDefault();
		if (event.target !== event.currentTarget) {
			return;
		}

		const payload = {
			image: imageFile,
			video: videoFile,
			description: editorText,
			user: props.user,
			timestamp: getFirestore.Timestamp.now(),
		};

		props.postArticle(payload);
		reset(event);
	}

	return (
		<>
			{props.showModal === "open" && (
				<Container>
					<Content>
						<Header>
							<h2>Create a post</h2>
							<button onClick={(event) => reset(event)}>
								<img src="/images/close-icon.svg" alt="" />
							</button>
						</Header>
						<SharedContent>
							<UserInfo>
								{props.user.photoURL ? <img src={props.user.photoURL} alt="" /> : <img src="/images/user.svg" alt="" />}
								<span>{props.user.displayName ? props.user.displayName : "Name"}</span>
							</UserInfo>
							<Editor>
								<textarea value={editorText} onChange={(event) => setEditorText(event.target.value)} placeholder="What do you want to talk about?" autoFocus={true} />

								{assetArea === "image" ? (
									<UploadImage>
										<input type="file" accept="image/gif, image/jpeg, image/png" name="image" id="imageFile" onChange={handleImage} style={{ display: "none" }} />
										<p>
											<label htmlFor="imageFile">Select an image to share</label>
										</p>
										{imageFile && <img src={URL.createObjectURL(imageFile)} alt="" />}
									</UploadImage>
								) : (
									assetArea === "video" && (
										<>
											<input
												type="text"
												name="video"
												id="videoFile"
												value={videoFile}
												placeholder="Enter the video link"
												onChange={(event) => setVideoFile(event.target.value)}
											/>
											{videoFile && <ReactPlayer width={"100%"} url={videoFile} />}
										</>
									)
								)}
							</Editor>
						</SharedContent>
						<ShareCreation>
							<AttachAsset>
								<AssetButton onClick={() => switchAssetArea("image")}>
									<img src="/images/share-image.svg" alt="" />
								</AssetButton>
								<AssetButton onClick={() => switchAssetArea("video")}>
									<img src="/images/share-video.svg" alt="" />
								</AssetButton>
							</AttachAsset>
							<ShareComment>
								<AssetButton>
									<img src="/images/share-comment.svg" alt="" />
									<span>Anyone</span>
								</AssetButton>
							</ShareComment>
							<PostButton disabled={!editorText ? true : false} onClick={(event) => postArticle(event)}>
								Post
							</PostButton>
						</ShareCreation>
					</Content>
				</Container>
			)}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		postArticle: (payload) => dispatch(postArticleAPI(payload)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PostalModal);