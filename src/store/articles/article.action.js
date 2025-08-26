import {  storage , db}  from "../../firebaseConfig"; // Update the import path
import { collection, addDoc, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore"; // Update the import paths
import { SET_LOADING_STATUS ,GET_ARTICLES } from "./article.types";


export function getArticles(payload, id) {
	return {
		type: GET_ARTICLES,
		payload: payload,
		id: id,
	};
}

export function setLoading(status) {
	return {
		type: SET_LOADING_STATUS,
		status: status,
	};
}

export function postArticleAPI(payload) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    const store = collection(db, "articles");

    if (payload.image !== "") {
      const upload = storage
        .ref(`user_uploads/${payload.user.uid}/${payload.image.name}`)
        .put(payload.image);

      upload.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // Optionally track progress
        },
        (err) => {
          alert(err.message);
          dispatch(setLoading(false));
        },
        async () => {
          const downloadURL = await upload.snapshot.ref.getDownloadURL();
          const articleData = {
            actor: {
              uid: payload.user.uid,  // ✅ store user ID
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: payload.video,
            sharedImg: downloadURL,
            likes: {
              count: 0,
              whoLiked: [],
            },
            comments: 0,
            description: payload.description,
          };
          await addDoc(store, articleData);
          dispatch(setLoading(false));
        }
      );
    } else {
      const articleData = {
        actor: {
          uid: payload.user.uid,  // ✅ store user ID
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video || "",
        sharedImg: "",
        likes: {
          count: 0,
          whoLiked: [],
        },
        comments: 0,
        description: payload.description,
      };
      await addDoc(store, articleData);
      dispatch(setLoading(false));
    }
  };
}


export function getArticlesAPI() {
	return (dispatch) => {
		dispatch(setLoading(true));
		const store = collection(db, "articles");

		const q = query(store, orderBy("actor.date", "desc"));
		const unsubscribe = onSnapshot(q, (snapshot) => {
			const payload = [];
			const id = [];
			snapshot.forEach((doc) => {
				payload.push(doc.data());
				id.push(doc.id);
			});
			dispatch(getArticles(payload, id));
			dispatch(setLoading(false));
		});

		return unsubscribe;
	};
}

export function updateArticleAPI(payload) {
	return async (dispatch) => {
		const articleRef = doc(db, "articles", payload.id);
		await updateDoc(articleRef, payload.update);
	};
}
