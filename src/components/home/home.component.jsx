import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Left from "../left/left.component";
import Main from "../main/main.component";
import Right from "../right/right.component";
import { Container,Section,Layout,Content } from "./home.styles";


function Home(props) {
	
	const navigate = useNavigate();

	useEffect(() => {
		if (!props.user) {
			return;
		}
		navigate("/feed"); // Redirect to /feed if user is already signed in
	  }, [props.user, navigate]);

	return (
		<Container>
			<Content>
				<Section>
					<h5>
						<a>Hiring in a hurray..?</a>
					</h5>
					<p>- Find talented pros in record time with LinkedIn and keep business moving.</p>
				</Section>
				<Layout>
					<Left />
					<Main />
					<Right />
				</Layout>
			</Content>
		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

export default connect(mapStateToProps)(Home);
