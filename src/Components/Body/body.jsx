import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { ListContext } from "../../Store/listProvider";
import { VehicleCtx } from "../../Store/vehicleProvider";
import classes from "./body.module.css";
import { useNavigate } from "react-router-dom";
import VehicleList from "./vehicleList";
import PlanetList from "./planetList";
import { Container, Row, Col } from "react-bootstrap";

const body = () => {
  let show = false;
  const listCtx = useContext(ListContext);
  const vehicleCtx = useContext(VehicleCtx);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch(
          "https://findfalcone.geektrust.com/planets"
        );
        const planets = await response.json();
        const name = planets.map((item) => {
          return item.name;
        });
        const mp = new Map();
        planets.forEach((item) => {
          mp.set(item.name, item.distance);
        });
        listCtx.addListItem(name, mp);
      } catch (err) {
        alert(err.message);
        navigate("/");
      }
    };
    const fetchVehicles = async () => {
      try {
        const response = await fetch(
          "https://findfalcone.geektrust.com/vehicles"
        );
        const vehicles = await response.json();
        vehicleCtx.addVehicle(vehicles);
      } catch (error) {
        alert(error.message);
        navigate("/");
      }
    };
    fetchPlanets();
    fetchVehicles();
  }, []);
  let calculatedTimeTaken = vehicleCtx.timeTaken;
  let timeTaken = listCtx.totalTime;
  const listOne = vehicleCtx.vehicalList1;
  const listTwo = vehicleCtx.vehicalList2;
  const listThree = vehicleCtx.vehicalList3;
  const listFour = vehicleCtx.vehicalList4;
  const vehicalArray1 = [];
  const vehicalArray2 = [];
  const vehicalArray3 = [];
  const vehicalArray4 = [];

  listOne.forEach((object) => {
    const selectedPlanet = listCtx.planetSelected1.distance;
    let state = false;

    if (selectedPlanet > object.max_distance) {
      state = true;
    } else {
      state = false;
    }
    vehicalArray1.push(
      <VehicleList
        key={object.name}
        object={object}
        inputid=" 1"
        distance={timeTaken}
        listName="list1"
        state={state}
        inputName="vehicle1"
      />
    );
  });

  listTwo.forEach((object) => {
    const selectedPlanet = listCtx.planetSelected2.distance;
    let state = false;

    if (selectedPlanet > object.max_distance || object.statement === true) {
      state = true;
    } else {
      state = false;
    }
    vehicalArray2.push(
      <VehicleList
        key={object.name}
        object={object}
        inputid=" 2"
        distance={timeTaken}
        listName="list2"
        state={state}
        inputName="vehicle2"
      />
    );
  });

  listThree.forEach((object) => {
    const selectedPlanet = listCtx.planetSelected3.distance;
    let state = false;

    if (selectedPlanet > object.max_distance || object.statement === true) {
      state = true;
    } else {
      state = false;
    }
    vehicalArray3.push(
      <VehicleList
        key={object.name}
        object={object}
        inputid=" 3"
        distance={timeTaken}
        listName="list3"
        state={state}
        inputName="vehicle3"
      />
    );
  });

  listFour.forEach((object) => {
    const selectedPlanet = listCtx.planetSelected4.distance;
    let state = false;
    if (selectedPlanet > object.max_distance || object.statement === true) {
      state = true;
    } else {
      state = false;
    }
    vehicalArray4.push(
      <VehicleList
        key={object.name}
        object={object}
        inputid=" 4"
        distance={timeTaken}
        listName="list4"
        state={state}
        inputName="vehicle4"
      />
    );
  });

  const clickHandler = async () => {
    const tokenRequest = async () => {
      try {
        const request = await fetch("https://findfalcone.geektrust.com/token", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        });
        return request.json();
      } catch (error) {
        alert(error.message);
        return error;
      }
    };
    const finalRequest = async () => {
      try {
        const token = await tokenRequest();
        const obj = {
          token: token.token,
          planet_names: listCtx.allPlanets,
          vehicle_names: vehicleCtx.allVehicles,
        };
        const postRequest = await fetch(
          "https://findfalcone.geektrust.com/find",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
          }
        );
        const response = await postRequest.json();
        const finalRes = { ...response, timeTaken: calculatedTimeTaken };

        navigate("/result/" + JSON.stringify(finalRes)); // for navigating to result page
      } catch (error) {
        alert(error.message);
      }
    };

    finalRequest();
  };
  if (listCtx.allPlanets.length === 4 && vehicleCtx.allVehicles.length === 4) {
    show = true;
  }
  return (
    <Fragment>
      <h4 className={classes.description}>
        Select planet you want to search in:
      </h4>

      <Container
        fluid
        style={{ marginLeft: "30%", width: "70%" }}
        className={classes.container}
      >
        <Row>
          <Col lg={2} md={2} sm={12}>
            <PlanetList
              listName="list1"
              heading="Destination 1"
              vehicleList={vehicalArray1}
              list={listCtx.list1}
            />
          </Col>
          <Col lg={2} md={2} sm={12}>
            <PlanetList
              listName="list2"
              heading="Destination 2"
              vehicleList={vehicalArray2}
              list={listCtx.list2}
            />
          </Col>
          <Col lg={2} md={2} sm={12}>
            <PlanetList
              listName="list3"
              heading="Destination 3"
              vehicleList={vehicalArray3}
              list={listCtx.list3}
            />
          </Col>
          <Col lg={2} md={2} sm={12}>
            <PlanetList
              listName="list4"
              heading="Destination 4"
              vehicleList={vehicalArray4}
              list={listCtx.list4}
            />
          </Col>
          <Col lg={4} md={2} sm={12} className={classes.timetaken}>
            <h3>Time taken :{" " + calculatedTimeTaken}</h3>
          </Col>
        </Row>
      </Container>

      <div className={classes.btn}>
        <button
          type="button"
          style={{
            pointerEvents: !show ? "none" : "",
            color: !show ? "gray" : "black",
            boxShadow: !show
              ? "4px 6px  rgba(0, 0, 0, 0.5)"
              : "4px 6px  rgba(0, 0, 0)",
            borderColor: !show ? "#a19d9d" : "black",
          }}
          onClick={clickHandler}
        >
          Find Falcone!
        </button>
      </div>
    </Fragment>
  );
};

export default body;
