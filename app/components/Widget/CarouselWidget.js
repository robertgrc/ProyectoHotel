import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Icon from '@material-ui/core/Icon';
import carouselData from 'dan-api/images/carouselData';
import 'dan-styles/vendors/slick-carousel/slick-carousel.css';
import 'dan-styles/vendors/slick-carousel/slick.css';
import 'dan-styles/vendors/slick-carousel/slick-theme.css';
import styles from './widget-jss';

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <IconButton
      className="nav-next"
      onClick={onClick}
    >
      <ArrowForward />
    </IconButton>
  );
}

SampleNextArrow.propTypes = {
  onClick: PropTypes.func,
};

SampleNextArrow.defaultProps = {
  onClick: undefined,
};

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <IconButton
      className="nav-prev"
      onClick={onClick}
    >
      <ArrowBack />
    </IconButton>
  );
}

SamplePrevArrow.propTypes = {
  onClick: PropTypes.func,
};

SamplePrevArrow.defaultProps = {
  onClick: undefined,
};

function CarouselWidget(props) {
  const { classes } = props;
  const settings = {
    dots: true,
    infinite: true,
    centerMode: false,
    speed: 500,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
    ],
    cssEase: 'ease-out',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
    <div className="container custom-arrow">
      <Slider {...settings}>
        {carouselData.map((item, index) => (
          <div key={index.toString()}>
            <div style={{ backgroundColor: item.background }} className={classes.carouselItem}>
              <Icon className={classes.iconBg}>{item.icon}</Icon>
              <Typography className={classes.carouselTitle} variant="subtitle1">
                <Icon>{item.icon}</Icon>
                {item.title}
              </Typography>
              <Typography className={classes.carouselDesc}>{item.desc}</Typography>
              <Button variant="outlined" size="small" className={classes.buttonReadMore}>

                Read More
              </Button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

CarouselWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CarouselWidget);
