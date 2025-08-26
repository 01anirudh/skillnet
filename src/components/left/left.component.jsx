import React from 'react';
import { connect } from 'react-redux';
import { ArtCard, UserInfo, CardBackground, Photo, Link, AddPhotoText, Container, Widget, Item, CommunityCard } from './left.styles.jsx';
import { StyleSheetManager } from 'styled-components';

function Left(props) {
  const photoUrl = props.user && props.user.photoURL ? props.user.photoURL : '/images/photo.svg';

  return (
    <Container>
        <ArtCard>
          <UserInfo>
            <CardBackground />
            <a href='#'>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== 'photourl'}>
              <Photo photourl={photoUrl} />
      </StyleSheetManager>
              <Link>Welcome, {props.user ? props.user.displayName : 'there'}!</Link>
            </a>
            <a href='#'>
              <AddPhotoText>Add a photo</AddPhotoText>
            </a>
          </UserInfo>
          <Widget>
            <a href='#'>
              <div>
                <span>Connections</span>
                <span>Grow Your Network</span>
              </div>
              <img src="/images/widget-icon.svg" alt="" />
            </a>
          </Widget>
          <Item href="#">
            <span>
              <img src="/images/item-icon.svg" alt="" />
              My Items
            </span>
          </Item>
        </ArtCard>
      <CommunityCard>
        <a href='#'>
          <span>Groups</span>
        </a>
        <a href='#'>
          <span>
            Events
            <img src="/images/plus-icon.svg" alt="" />
          </span>
        </a>
        <a href='#'>
          <span>Follow Hashtags</span>
        </a>
        <a href='#'>
          <span>Discover More</span>
        </a>
      </CommunityCard>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(Left);
