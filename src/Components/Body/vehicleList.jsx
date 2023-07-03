import { Fragment, useContext } from "react";
import { ListContext } from "../../Store/listProvider";
import { VehicleCtx } from "../../Store/vehicleProvider";

const VehicleList = (props) => {
  const name = props.object.name;
  const quantity = props.object.total_no;
  const listCtx = useContext(ListContext);
  const vehicleCtx = useContext(VehicleCtx);
  const onSubmitVehicle = (e) => {
    if (e.target.id.length > 0) {
      const element = `${e.target.id.split(" ")[0]} ${
        e.target.id.split(" ")[1]
      }`;
      vehicleCtx.updateTime(props.distance, element, props.listName);
      vehicleCtx.updateVehicle(element, props.listName);

      if (props.listName === "list4") {
        const arr = [];
        const arr1 = [];
        arr.push(
          listCtx.planetSelected1.name,
          listCtx.planetSelected2.name,
          listCtx.planetSelected3.name,
          listCtx.planetSelected4.name
        );
        arr1.push(
          vehicleCtx.vehicleSelected1,
          vehicleCtx.vehicleSelected2,
          vehicleCtx.vehicleSelected3,
          element
        );
        listCtx.addPlanets(arr);
        vehicleCtx.addAllVehicle(arr1);
      }
    }
  };

  return (
    <Fragment>
      <div
        style={{
          pointerEvents: props.state ? "none" : "",
          color: props.state ? "gray" : "black",
        }}
        onClick={onSubmitVehicle}
      >
        <input type="radio" name={props.inputName} id={name + props.inputid} />
        <label htmlFor={name + props.inputid}>{`${name}(${quantity})`}</label>
      </div>
    </Fragment>
  );
};
export default VehicleList;
