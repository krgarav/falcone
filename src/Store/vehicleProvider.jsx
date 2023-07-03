import React, { useReducer } from "react";

export const VehicleCtx = React.createContext({
  vehicle: [],
  vehicalList1: [],
  vehicalList2: [],
  vehicalList3: [],
  vehicalList4: [],
  vehicleSelected: "",
  vehicleSelected1: "",
  vehicleSelected2: "",
  vehicleSelected3: "",
  vehicleSelected4: "",
  vehicleListState: false,
  timeTaken: 0,
  timeTaken1: 0,
  timeTaken2: 0,
  timeTaken3: 0,
  timeTaken4: 0,
  allVehicles: [],
  addVehicle: () => {},
  updateVehicle: () => {},
  updateTime: () => {},
  addAllVehicle: () => {},
});

const defautVehicleState = {
  vehicle: [],
  vehicalList1: [],
  vehicalList2: [],
  vehicalList3: [],
  vehicalList4: [],
  vehicleSelected: "",
  vehicleSelected1: "",
  vehicleSelected2: "",
  vehicleSelected3: "",
  vehicleSelected4: "",
  vehicleState: false,
  allVehicles: [],
  timeTaken: 0,
  timeTaken1: 0,
  timeTaken2: 0,
  timeTaken3: 0,
  timeTaken4: 0,
};
const vehicleReducer = (state, action) => {
  if (action.type === "ADD") {
    return {
      ...state,
      vehicle: action.item,
      vehicalList1: action.item,
      vehicalList2: action.item,
      vehicalList3: action.item,
      vehicalList4: action.item,
    };
  }
  if (action.type === "UPDATE") {
    let updatedVehicleList = [];
    let statement = false;
    switch (action.listName) {
      case "list1":
        const list1 = state.vehicle.map((object) => {
          if (object.name === action.vehicleSelected) {
            if (object.total_no === 1) {
              statement = true;
            } else {
              statement = false;
            }
            return {
              ...object,
              total_no: Number(object.total_no) - 1,
             statement
            };
          }
          return object;
        });
        const listOne = list1.map((object) => {
          if (object.name === action.vehicleSelected) {
            if (object.total_no === 0) {
              statement = true;
            } else {
              statement = false;
            }
            return {
              ...object,
              statement,
            };
          }
          return object;
        });
        updatedVehicleList = {
          ...state,
          vehicalList1: list1,
          vehicalList2: listOne,
          vehicalList3: listOne,
          vehicalList4: listOne,
          vehicleSelected: action.vehicleSelected,
          vehicleSelected1: action.vehicleSelected,
        };
        break;
      case "list2":
        const list2 = state.vehicalList1.map((object) => {
          if (object.name === action.vehicleSelected) {
            if (object.total_no === 1) {
              statement = true;
            } else {
              statement = false;
            }
            return {
              ...object,
              total_no: Number(object.total_no) - 1,
              statement
            };
          }
          return object;
        });
        const listTwo = list2.map((object) => {
          if (object.name === action.vehicleSelected) {
            if (object.total_no === 0) {
              statement = true;
            } else {
              statement = false;
            }
            return {
              ...object,
              statement,
            };
          }
          return object;
        });
        updatedVehicleList = {
          ...state,
          vehicalList2: list2,
          vehicalList3: listTwo,
          vehicalList4: listTwo,
          vehicleSelected: action.vehicleSelected,
          vehicleSelected2: action.vehicleSelected,
        };
        break;
      case "list3":
        const list3 = state.vehicalList2.map((object) => {
          if (object.name === action.vehicleSelected) {
            if (object.total_no === 1) {
              statement = true;
            } else {
              statement = false;
            }
            return {
              ...object,
              total_no: Number(object.total_no) - 1,
              statement
            };
          }
          return object;
        });
        const listThree = list3.map((object) => {
          if (object.name === action.vehicleSelected) {
            if (object.total_no === 0) {
              statement = true;
            } else {
              statement = false;
            }
            return {
              ...object,
              statement,
            };
          }
          return object;
        });
        updatedVehicleList = {
          ...state,
          vehicalList3: list3,
          vehicalList4: listThree,
          vehicleSelected: action.vehicleSelected,
          vehicleSelected3: action.vehicleSelected,
        };
        break;
      case "list4":
        const list4 = state.vehicalList3.map((object) => {
          if (object.name === action.vehicleSelected) {
            if (object.total_no === 1) {
              statement = true;
            } else {
              statement = false;
            }
            return {
              ...object,
              total_no: Number(object.total_no) - 1,
              statement
            };
          }
          return object;
        });

        updatedVehicleList = {
          ...state,
          vehicalList4: list4,
          vehicleSelected: action.vehicleSelected,
          vehicleSelected4: action.vehicleSelected,
        };
        break;

      default:
        break;
    }
    return updatedVehicleList;
  }
  if (action.type === "UPDATE_TIME") {
    let speed = 1;
    let updatedTime = 0;
    let updatedObj = {};
    state.vehicle.forEach((object) => {
      if (object.name === action.vehicle) {
        speed = object.speed;
      }
    });
    switch (action.listName) {
      case "list1":
        updatedTime = action.distance / speed;
        updatedObj = {
          ...state,
          timeTaken1: updatedTime,
          timeTaken: updatedTime,
        };
        break;
      case "list2":
        updatedTime = state.timeTaken1 + action.distance / speed;
        updatedObj = {
          ...state,
          timeTaken2: updatedTime,
          timeTaken: updatedTime,
        };
        break;
      case "list3":
        updatedTime = state.timeTaken2 + action.distance / speed;
        updatedObj = {
          ...state,
          timeTaken3: updatedTime,
          timeTaken: updatedTime,
        };
        break;
      case "list4":
        updatedTime = state.timeTaken3 + action.distance / speed;
        updatedObj = {
          ...state,
          timeTaken4: updatedTime,
          timeTaken: updatedTime,
        };
        break;

      default:
        break;
    }

    return updatedObj;
  }
  if (action.type === "UPDATE_VEHICLES") {
    return { ...state, allVehicles: action.item };
  }
};
const vehicalProvider = (props) => {
  const [vehicleState, dispatchVehicleState] = useReducer(
    vehicleReducer,
    defautVehicleState
  );
  const addVehicle = (item) => {
    dispatchVehicleState({ type: "ADD", item });
  };
  const updateVehicle = (vehicleSelected, listName) => {
    dispatchVehicleState({ type: "UPDATE", vehicleSelected, listName });
  };
  const updateTime = (distance, vehicle, listName) => {
    dispatchVehicleState({ type: "UPDATE_TIME", distance, vehicle, listName });
  };
  const addAllVehicle = (item) => {
    dispatchVehicleState({ type: "UPDATE_VEHICLES", item });
  };
  const vehicleCtx = {
    vehicle: vehicleState.vehicle,
    vehicalList1: vehicleState.vehicalList1,
    vehicalList2: vehicleState.vehicalList2,
    vehicalList3: vehicleState.vehicalList3,
    vehicalList4: vehicleState.vehicalList4,
    vehicleSelected: vehicleState.vehicleSelected,
    vehicleSelected1: vehicleState.vehicleSelected1,
    vehicleSelected2: vehicleState.vehicleSelected2,
    vehicleSelected3: vehicleState.vehicleSelected3,
    vehicleSelected4: vehicleState.vehicleSelected4,
    vehicleState: vehicleState.vehicleState,
    timeTaken: vehicleState.timeTaken,
    timeTaken1: vehicleState.timeTaken1,
    timeTaken2: vehicleState.timeTaken2,
    timeTaken3: vehicleState.timeTaken3,
    timeTaken4: vehicleState.timeTaken4,
    allVehicles: vehicleState.allVehicles,
    addVehicle: addVehicle,
    updateVehicle: updateVehicle,
    updateTime: updateTime,
    addAllVehicle: addAllVehicle,
  };
  return (
    <VehicleCtx.Provider value={vehicleCtx}>
      {props.children}
    </VehicleCtx.Provider>
  );
};

export default vehicalProvider;
