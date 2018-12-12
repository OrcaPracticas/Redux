/* eslint-disabled */
import React, { Component } from "react";
import { connect } from "react-redux";
import HomeLayout from "../components/home-layout";
import Categories from "../../categories/components/categories";
import Related from "../components/related";
import ModalContainer from "../../widgets/containers/modal";
import Modal from "../../widgets/components/modal";
import HandleError from "../../error/containers/handle-error";
import VideoPlayer from "../../player/containers/video-player";

class Home extends Component {
  state = {
      modalVisible: false,
  }

  handleOpenModal = (media) => {
      this.setState({
          modalVisible: true,
          media,
      });
  }

  handleCloseModal = (event) => {
      this.setState({
          modalVisible: false,
      });
  }

  render() {
      return (
          <HandleError>
              <HomeLayout>
                  <Related />
                  <Categories
                      categories={this.props.categories}
                      handleOpenModal={this.handleOpenModal}
                      search={this.props.search}
                  />
                  {
                      this.state.modalVisible
            && (
                <ModalContainer>
                    <Modal
                        handleClick={this.handleCloseModal}
                    >
                        <VideoPlayer
                            autoplay
                            src={this.state.media.src}
                            title={this.state.media.title}
                        />
                    </Modal>
                </ModalContainer>
            )
                  }
              </HomeLayout>
          </HandleError>
      );
  }
}

/**
 * para este caso se mandan los valores del
 * store omo props
 * @param  {store} state Datos provenientes del store.
 */
const mapToStateToProps = (state, props) => {
    return {
        categories: state.data.categories,
        search: state.search,
    };
};

export default connect(mapToStateToProps)(Home);
