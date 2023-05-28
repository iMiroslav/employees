import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Title from "../common/Title";
import { Controller, useForm } from "react-hook-form";
import { useEmployeeStore } from "../../store/employeesStore";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const genderOptions = [
  {
    label: "Male",
    value: "M",
  },
  {
    label: "Female",
    value: "F",
  },
];

const AddEmployee = () => {
  const navigate = useNavigate();

  const schema = yup
    .object({
      name: yup.string().required(),
      jobTitle: yup.string().required(),
      tenure: yup.number().positive().integer().required(),
      gender: yup.string().required(),
    })
    .required();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    reValidateMode: "onBlur",
    resolver: yupResolver(schema),
  });
  const addEmployee = useEmployeeStore((state) => state.addEmployee);

  const onSubmit = (data: any) => {
    const genderOption = genderOptions.find(
      (option) => option.value === data.gender
    );
    data.gender = genderOption?.label;
    addEmployee(data);
    navigate("/dashboard");
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <Card>
      <CardContent>
        <Title>Add New Employee</Title>
        <form>
          <Controller
            name="name"
            control={control}
            defaultValue={""}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                margin="dense"
                id="name"
                label="Name"
                fullWidth
                variant="outlined"
                error={errors.name !== undefined}
                helperText={(errors.name?.message as string) || ""}
              />
            )}
          />
          <Controller
            name="jobTitle"
            control={control}
            defaultValue={""}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                margin="dense"
                id="jobTitle"
                label="Job Title"
                fullWidth
                variant="outlined"
                error={errors.jobTitle !== undefined}
                helperText={(errors.jobTitle?.message as string) || ""}
              />
            )}
          />
          <Controller
            name="tenure"
            control={control}
            defaultValue={""}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                margin="dense"
                id="tenure"
                label="Tenure"
                fullWidth
                variant="outlined"
                error={errors.tenure !== undefined}
                helperText={(errors.tenure?.message as string) || ""}
              />
            )}
          />

          <Controller
            name="gender"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  {...field}
                  variant="outlined"
                  labelId="gender-label"
                  id="gender"
                  fullWidth
                  margin="dense"
                  error={errors.gender !== undefined}
                >
                  {genderOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {(errors.gender?.message as string) || ""}
                </FormHelperText>
              </FormControl>
            )}
          />
        </form>
      </CardContent>
      <CardActions>
        <Button onClick={handleClose}>Home</Button>
        <Button onClick={() => reset()}>Reset</Button>
        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </CardActions>
    </Card>
  );
};

export default AddEmployee;
