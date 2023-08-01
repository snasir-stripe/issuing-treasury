import {
  Dialog,
  DialogTitle,
  Divider,
  Button,
  DialogContent,
  DialogActions,
  Typography,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormHelperText,
  TextField,
  Grid,
} from "@mui/material";
import { useMachine } from "@xstate/react";
import {
  Formik,
  Form,
  Field,
  FormikProps,
  FormikValues,
  ErrorMessage,
} from "formik";
import React, { RefObject, use, useRef, useState } from "react";
import * as Yup from "yup";

import stateMachine from "src/sections/financial-account/send-money-wizard-state-machine";

const SelectingNetworkForm = ({
  formRef,
  onFormSubmit,
  setNetwork,
}: {
  formRef: RefObject<FormikProps<FormikValues>>;
  onFormSubmit: () => void;
  setNetwork: (network: string) => void;
}) => {
  const initialValues = {
    network: "",
  };
  const validationSchema = Yup.object().shape({
    network: Yup.string().required("Please select a network"),
  });

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setNetwork(values.network);
        onFormSubmit();
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography>
                In this demo you can test an experience for sending funds from a
                Treasury Financial Account to an external 3rd party US bank
                account. Depending on the network type, timing for funds to be
                available may vary.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                You can set the status of the transaction before sending the
                payment for demo purposes. Do not forget to check the Financial
                Account balance afterwards!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormLabel htmlFor="network">Network</FormLabel>
              <Field as={RadioGroup} aria-label="network" name="network">
                <FormControlLabel value="ach" control={<Radio />} label="ACH" />
                <FormControlLabel
                  value="us_domestic_wire"
                  control={<Radio />}
                  label="Wire Transfer"
                />
              </Field>
              <ErrorMessage name="network">
                {(errorMsg: string) => (
                  <FormHelperText error={Boolean(errors.network)}>
                    {errorMsg}
                  </FormHelperText>
                )}
              </ErrorMessage>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

const CollectingDestinationAddressForm = ({
  formRef,
  onFormSubmit,
  network,
}: {
  formRef: RefObject<FormikProps<FormikValues>>;
  onFormSubmit: () => void;
  network: string;
}) => {
  const initialValues = {
    name: "",
    routing_number: "",
    account_number: "",
    amount: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    routing_number: Yup.string().required("Routing Number is required"),
    account_number: Yup.string().required("Account Number is required"),
    amount: Yup.number().required("Amount is required").min(0),
  });

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        onFormSubmit();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="name"
                required
                label="Name"
                fullWidth
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>
            {network === "us_domestic_wire" && (
              <>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    required
                    label="Street address"
                    name="address1"
                    error={touched.address1 && Boolean(errors.address1)}
                    helperText={touched.address1 && errors.address1}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field
                    as={TextField}
                    fullWidth
                    required
                    label="City"
                    name="city"
                    error={touched.city && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field
                    as={TextField}
                    fullWidth
                    required
                    label="State"
                    name="state"
                    error={touched.state && Boolean(errors.state)}
                    helperText={touched.state && errors.state}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field
                    as={TextField}
                    fullWidth
                    required
                    label="ZIP / Postal code"
                    name="postalCode"
                    error={touched.postalCode && Boolean(errors.postalCode)}
                    helperText={touched.postalCode && errors.postalCode}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name="routing_number"
                required
                label="Routing Number"
                fullWidth
                error={touched.routing_number && Boolean(errors.routing_number)}
                helperText={touched.routing_number && errors.routing_number}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                name="account_number"
                required
                label="Account Number"
                fullWidth
                error={touched.account_number && Boolean(errors.account_number)}
                helperText={touched.account_number && errors.account_number}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="amount"
                type="number"
                required
                label="Amount"
                fullWidth
                error={touched.amount && Boolean(errors.amount)}
                helperText={touched.amount && errors.amount}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="account_notes"
                type="number"
                label="Account Notes (Optional)"
                fullWidth
                error={touched.account_notes && Boolean(errors.account_notes)}
                helperText={touched.account_notes && errors.account_notes}
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

const SendMoneyWizardDialog = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [current, send] = useMachine(stateMachine);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleNext = () => {
    send("NEXT");
  };

  const handleBack = () => {
    send("BACK");
  };

  const [network, setNetwork] = useState("");

  const selectingNetworkFormRef = useRef<FormikProps<FormikValues>>(null);
  const collectingDestinationAddressFormRef =
    useRef<FormikProps<FormikValues>>(null);
  const confirmingTransferFormRef = useRef<FormikProps<FormikValues>>(null);
  const handleSubmitSelectingNetworkForm = () => {
    const selectingNetworkForm = selectingNetworkFormRef.current;
    if (selectingNetworkForm) {
      selectingNetworkForm.submitForm();
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="contained">
        Send Money
      </Button>
      <Dialog open={showModal} onClose={handleClose}>
        <DialogTitle>Send Money</DialogTitle>
        <Divider />
        <DialogContent>
          {current.matches("selectingNetwork") && (
            <SelectingNetworkForm
              formRef={selectingNetworkFormRef}
              onFormSubmit={handleNext}
              setNetwork={setNetwork}
            />
          )}
          {current.matches("collectingDestinationAddress") && (
            <CollectingDestinationAddressForm
              formRef={collectingDestinationAddressFormRef}
              onFormSubmit={handleNext}
              network={network}
            />
          )}
          {current.matches("confirmingTransfer") && (
            <div>confirmingTransfer</div>
          )}
        </DialogContent>
        <Divider />
        <DialogActions>
          {current.matches("selectingNetwork") && (
            <div>
              <Button id="foo" onClick={handleNext} variant="contained">
                Next
              </Button>
              <Button onClick={handleSubmitSelectingNetworkForm}>Submit</Button>
            </div>
          )}
          {current.matches("collectingDestinationAddress") && (
            <div>
              <Button onClick={handleBack} variant="contained">
                Back
              </Button>
              <Button onClick={handleNext} variant="contained">
                Next
              </Button>
            </div>
          )}
          {current.matches("confirmingTransfer") && (
            <div>
              <Button onClick={handleBack} variant="contained">
                Back
              </Button>
              <Button variant="contained">Transfer</Button>
            </div>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SendMoneyWizardDialog;