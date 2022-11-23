import { Dialog, DialogContent } from "@mui/material";
function PopUp(props) {
  //Attributs comming from props:
  const { children, openPopup } = props;
  return (
    <Dialog open={openPopup} maxWidth="lg" maxheigth="lg">
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default PopUp;
