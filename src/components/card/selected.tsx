import {Card, useTheme, withStyles} from "@material-ui/core";

const theme = useTheme();

export const SelectedCard = withStyles({
  root: {
    color: theme.palette.primary.main,
  }
})(Card);