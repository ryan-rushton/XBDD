import React from "react";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { inputFielsStyles } from "./styles/ScenarioListStyles";

const ScenarioInputField = props => {
  const { id, label, placeholder, value, handleScenarioCommentChanged, classes } = props;

  return (
    <div className={classes.inputField}>
      <TextField
        label={label}
        placeholder={placeholder}
        multiline
        rows="2"
        fullWidth={true}
        value={value ? value : ""}
        onChange={e => handleScenarioCommentChanged(id, label, e)}
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
    </div>
  );
};

export default withStyles(inputFielsStyles)(ScenarioInputField);
