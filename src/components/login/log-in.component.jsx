import React ,{useEffect} from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInAPI } from "../../store/users/users.action";
import { Container,Nav,Join,SignIn,Section,Hero,Form,Google, } from "./log-in.styles";


function Login(props) {
    const navigate = useNavigate(); // Use the useNavigate hook

  useEffect(() => {
    if (props.user) {
      navigate("/feed"); // Redirect to /feed if user is already signed in
    }
  }, [props.user, navigate]);

  const handleSignIn =  () => {
    props.signIn();
    navigate("/feed"); // Navigate to the /feed route
  };
	return (
		<Container>
			
			<Nav>
				<a href="/">
					<img src="/images/login-logo.svg" alt="" />
				</a>
				<div>
					<Join>Join Now</Join>
					<SignIn onClick={handleSignIn}>Sign In</SignIn>
				</div>
			</Nav>
			<Section>
				<Hero>
					<h1>Welcome to your professional community</h1>
					<img src="/images/login-hero.svg" alt="" />
				</Hero>
				<Form>
					<Google onClick={() => props.signIn()}>
						<img src="/images/google.svg" alt="" />
						Sign in with Google
					</Google>
				</Form>
			</Section>
		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

const mapDispatchToProps = (dispatch) => ({
	signIn: () => dispatch(signInAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);