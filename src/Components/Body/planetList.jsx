import { Fragment, useContext, useState } from "react";
import { ListContext } from "../../Store/listProvider";

const PlanetList = (props) => {
  const [listState, setList1State] = useState(false);
  const listCtx = useContext(ListContext);
  const destinationOptions = props.list.map((item) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  });

  const onSelectHandler = (e) => {
    const toBeRemovedItem = e.target.value;
    const updatedArr = props.list.filter((item) => {
      return item !== toBeRemovedItem;
    });

    listCtx.updateList(updatedArr, props.listName, toBeRemovedItem);
    setList1State(true);
  };
  return (
    <Fragment>
      <p>{props.heading}</p>
      <select onChange={onSelectHandler} defaultValue={""}>
        <option disabled value="" hidden>
          Select
        </option>
        {props.planetList}
        {destinationOptions}
      </select>
      <br />
      <br />

      {listState && <section>{props.vehicleList}</section>}
    </Fragment>
  );
};
export default PlanetList;
