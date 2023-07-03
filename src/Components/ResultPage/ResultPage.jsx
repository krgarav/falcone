import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import classes from "./ResultPage.module.css";
import { Fragment } from "react";
const ResultPage = () => {
  const { item } = useParams();
  const obj = JSON.parse(item);
  const status = obj.status === "success" ? true : false;
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/", { replace: true });
  };

  return (
    <Fragment>
      <Header />
      <div className={classes.body}>
        {status && (
          <div>
            <p>
              Success! Congratulation on Finding Falcone. King Shan is mighty
              pleased.
            </p>
            <div className={classes.description}>
            <p>TimeTaken :{" "+obj.timeTaken}</p>
            <p>Planet found :{" "+obj.planet_name}</p>
            </div>
          </div>
        )}
        {!status && (
          <div>
            <p>Failed! Falcon Not Found. Please start again.</p>
          </div>
        )}
      </div>
      <div className={classes.btn}>
      <button onClick={onClickHandler}>Start Again</button>
      </div>
   
      <Footer />
    </Fragment>
  );
};
export default ResultPage;
