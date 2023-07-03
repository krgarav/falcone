import React, { useContext, useReducer } from "react";
import { VehicleCtx } from "./vehicleProvider";

export const ListContext = React.createContext({
  mainList: [],
  vehicleList: [],
  list1: [],
  list2: [],
  list3: [],
  list4: [],
  totalTime: 0,
  planetSelected: "",
  planetSelected1: "",
  planetSelected2: "",
  planetSelected3: "",
  planetSelected4: "",
  allPlanets: [],
  addVehicleList: (item) => {},
  addListItem: (item) => {},
  removeListItem: (item) => {},
  updateList: (updatedArr, listname) => {},
  addPlanets: (item) => {},
});
const defaultListState = {
  mainList: [],
  vehicleList: [],
  list1: [],
  list2: [],
  list3: [],
  list4: [],
  allPlanets: [],
  totalTime: 0,
  planetSelected1: "",
  planetSelected2: "",
  planetSelected3: "",
  planetSelected4: "",
};

const listReducer = (state, action) => {
  if (action.type === "ADD") {
    const newList = [...action.item];

    return {
      ...state,
      mainList: action.mainItem,
      list1: newList,
      list2: newList,
      list3: newList,
      list4: newList,
    };
  }
  if (action.type === "ADDVEHICLE") {
    return { ...state, vehicleList: action.item };
  }
  if (action.type === "UPDATE") {
    let updateArr = {};
    let selectedPlanetObject;
    let updatedTime;
    switch (action.remove) {
      case "list1":
        updatedTime = state.mainList.get(action.toBeRemoved);
        selectedPlanetObject = {
          name: action.toBeRemoved,
          distance: updatedTime,
        };

        updateArr = {
          ...state,
          list2: action.array,
          list3: action.array,
          list4: action.array,
          totalTime: updatedTime,
          planetSelected1: selectedPlanetObject,
        };

        break;
      case "list2":
        updatedTime = state.mainList.get(action.toBeRemoved);
        selectedPlanetObject = {
          name: action.toBeRemoved,
          distance: updatedTime,
        };

        updateArr = {
          ...state,
          list3: action.array,
          list4: action.array,
          totalTime: updatedTime,
          planetSelected2: selectedPlanetObject,
        };
        break;
      case "list3":
        updatedTime = state.mainList.get(action.toBeRemoved);
        selectedPlanetObject = {
          name: action.toBeRemoved,
          distance: updatedTime,
        };
        updateArr = {
          ...state,
          list4: action.array,
          totalTime: updatedTime,
          planetSelected3: selectedPlanetObject,
        };
        break;
      case "list4":
        updatedTime = state.mainList.get(action.toBeRemoved);
        selectedPlanetObject = {
          name: action.toBeRemoved,
          distance: updatedTime,
        };
        updateArr = {
          ...state,
          planetSelected4: selectedPlanetObject,
          totalTime: updatedTime,
        };
        break;

      default:
        break;
    }
    return updateArr;
  }
  if (action.type === "UPDATE_PLANETS") {
    return { ...state, allPlanets: action.item };
  }
  return defaultListState;
};
const ListProvider = (props) => {
  const vehicleCtx = useContext(VehicleCtx);
  const [listState, dispatchListState] = useReducer(
    listReducer,
    defaultListState
  );
  const addListItem = (item, mainItem, toBeRemovedItem) => {
    dispatchListState({
      type: "ADD",
      item: item,
      mainItem: mainItem,
      toBeRemovedItem,
    });
  };
  const removeListItem = () => {
    dispatchListState({ type: "REMOVE" });
  };
  const updateList = (updatedArray, listname, toBeRemoved) => {
    dispatchListState({
      type: "UPDATE",
      array: updatedArray,
      remove: listname,
      toBeRemoved,
      speed: vehicleCtx.vehicle,
    });
  };
  const addVehicleList = (item) => {
    dispatchListState({
      type: "ADDVEHICLE",
      item: item,
    });
  };
  const addPlanets = (item) => {
    dispatchListState({
      type: "UPDATE_PLANETS",
      item,
    });
  };
  const listContext = {
    mainList: listState.mainList,
    vehicleList: listState.vehicleList,
    list1: listState.list1,
    list2: listState.list2,
    list3: listState.list3,
    list4: listState.list4,
    totalTime: listState.totalTime,
    planetSelected1: listState.planetSelected1,
    planetSelected2: listState.planetSelected2,
    planetSelected3: listState.planetSelected3,
    planetSelected4: listState.planetSelected4,
    allPlanets: listState.allPlanets,
    addVehicleList: addVehicleList,
    addListItem: addListItem,
    removeListItem: removeListItem,
    updateList: updateList,
    addPlanets: addPlanets,
  };
  return (
    <ListContext.Provider value={listContext}>
      {props.children}
    </ListContext.Provider>
  );
};

export default ListProvider;
