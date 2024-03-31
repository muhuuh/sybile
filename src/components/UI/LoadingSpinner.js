import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
  return (
    <div
      className={
        props.spinnerSize === "small" ? classes.smallSpinner : classes.spinner
      }
    ></div>
  );
};

export default LoadingSpinner;
