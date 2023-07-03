
import VehicalProvider from "../../Store/vehicleProvider";
import ListProvider from "../../Store/listProvider";
import Header from "../Header/header";
import Body from "../Body/body";
import Footer from "../Footer/footer";
const homepage = () => {
  return (
    <>
      <VehicalProvider>
        <ListProvider>
          <Header />
          <Body />
          <Footer />
        </ListProvider>
      </VehicalProvider>
    </>
  );
};
export default homepage;
