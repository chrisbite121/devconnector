import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import Spinner from "../common/Spinner";
import { getProfileByHandle } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (isEmpty(nextProps.profile.profile) && this.props.profile.loading) {
      this.props.history.push("/not-found");
      console.log("redirecting");
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (isEmpty(profile) || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back to Profiles
              </Link>
            </div>
          </div>
          <div className="col-md-6" />
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = {
  getProfileByHandle
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);