import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ProductSummary from 'models/ProductSummary';
import ProductListContainer from './productList/ProductListContainer';
import SummaryStyles from './styles/SummaryStyles';
import { getSummaryOfReports, setProductFavouriteOn, setProductFavouriteOff, pinABuild, unPinABuild } from 'lib/rest/Rest';

class SummaryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { productList: null };

    this.handleFavouriteChange = this.handleFavouriteChange.bind(this);
    this.handlePinChange = this.handlePinChange.bind(this);
  }

  componentDidMount() {
    getSummaryOfReports().then(summaryData => {
      if (summaryData) {
        const productList = new ProductSummary(summaryData).productList;
        this.setState({
          productList,
        });
      }
    });
  }

  changeFavouriteStatus(isFavourite, product) {
    if (isFavourite) {
      return setProductFavouriteOff(product.name);
    }
    return setProductFavouriteOn(product.name);
  }

  handleFavouriteChange(product) {
    const isFavourite = product.favourite;
    const newProductList = this.state.productList;

    this.changeFavouriteStatus(isFavourite, product).then(response => {
      if (response && response.ok) {
        const newProduct = newProductList.find(item => item.name === product.name);
        newProduct.setFavouriteStatus(!isFavourite);
        this.setState({
          productList: newProductList,
        });
      }
    });
  }

  changePinStatus(product, version, build, isPinned) {
    if (isPinned) {
      return unPinABuild(product.name, version.major, version.minor, version.servicePack, build);
    }
    return pinABuild(product.name, version.major, version.minor, version.servicePack, build);
  }

  handlePinChange(product, version, build, isPinned) {
    const newProductList = this.state.productList;

    this.changePinStatus(product, version, build, isPinned).then(response => {
      if (response.status === 200) {
        const newProduct = newProductList.find(item => item.name === product.name);
        newProduct.updateProductPinnedBuildList(version, build, isPinned);
        this.setState({
          productList: newProductList,
        });
      }
    });
  }

  render() {
    if (this.state.productList) {
      return (
        <>
          <Card elevation={0}>
            <Grid container>
              <Grid item xs={6} className={this.props.classes.productListContainer}>
                <Card raised>
                  <ProductListContainer
                    list={this.state.productList}
                    title={'Product List'}
                    handleFavouriteChange={this.handleFavouriteChange}
                    handlePinChange={this.handlePinChange}
                  />
                </Card>
              </Grid>
              <Grid item xs={6} className={this.props.classes.productListContainer}>
                <Card raised>
                  <ProductListContainer
                    list={this.state.productList.filter(product => product.favourite)}
                    title={'Favourite'}
                    handleFavouriteChange={this.handleFavouriteChange}
                    handlePinChange={this.handlePinChange}
                  />
                </Card>
              </Grid>
            </Grid>
          </Card>
        </>
      );
    }
    return null;
  }
}

SummaryContainer.propTypes = {
  classes: PropTypes.shape({}),
};

export default withStyles(SummaryStyles)(SummaryContainer);
