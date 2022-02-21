const app = Vue.createApp({
  data() {
    return {
      pavedRoadKm: 0,
      unpavedRoadKm: 0,
      cargoWeight: 0,
      transportCost: {},
      totalCost: "0.00",
      vehicleCategories: [{ label: "Truck", code: "TRUCK" }],
      vehicleTypes: [
        { label: "Dump", code: "DUMP" },
        { label: "Box", code: "BOX" },
        { label: "Tractor", code: "TRACTOR" },
      ],
      messages: {
        is_required: "is required.",
        should_be_number: "should be of the numeric type.",
        cannot_be_negative: "cannot be negative.",
      },
      errors: [],
    };
  },
  methods: {
    calculate(event) {
      const vehicleCategoryValid = this.validate(this.vehicleCategory, {
        inputType: String,
        messageType: "Vehicle Category",
      });

      const vehicleTypeValid = this.validate(this.vehicleType, {
        inputType: String,
        messageType: "Vehicle Type",
      });

      const pavedRoadKmValid = this.validate(this.pavedRoadKm, {
        inputType: Number,
        messageType: "Paved Road",
      });

      const unpavedRoadKmValid = this.validate(this.unpavedRoadKm, {
        inputType: Number,
        messageType: "Unpaved Road",
      });

      const cargoWeightValid = this.validate(this.cargoWeight, {
        inputType: Number,
        messageType: "Cargo Weight",
      });

      if (
        vehicleCategoryValid &&
        vehicleTypeValid &&
        pavedRoadKmValid &&
        unpavedRoadKmValid &&
        cargoWeightValid
      ) {
        let url = new URL("http://localhost:8080/cost/calculation");
        url.searchParams.append("vehicle_category", this.vehicleCategory);
        url.searchParams.append("vehicle_type", this.vehicleType);
        url.searchParams.append("paved_km", this.pavedRoadKm);
        url.searchParams.append("unpaved_km", this.unpavedRoadKm);
        url.searchParams.append("weight_cargo", this.cargoWeight);

        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((transportCost) => {
            this.totalCost = "152.56";
          })
          .catch((error) => this.addError(error.message));
      } else {
        this.totalCost = "0.00";
      }

      event.preventDefault();
    },
    validate(input, options) {
      const { inputType, messageType } = options;
      let isValid = true;

      if (inputType === String) {
        isValid = this.validateRequired(input, messageType);
      }

      if (inputType === Number) {
        isValid = this.validateNumber(input, messageType);
      }

      return isValid;
    },
    validateRequired(input, messageType) {
      const { is_required: isRequired } = this.messages;
      const isRequiredMessage = `${messageType} ${isRequired}`;
      let isValid = true;

      if (!input) {
        this.addError(isRequiredMessage);
        isValid = false;
      } else {
        this.removeError(isRequiredMessage);
      }

      return isValid;
    },
    validateNumber(input, messageType) {
      const {
        should_be_number: shouldBeNumber,
        cannot_be_negative: cannotBeNegative,
      } = this.messages;
      const shouldBeNumberMessage = `${messageType} ${shouldBeNumber}`;
      const cannotBeNegativeMessage = `${messageType} ${cannotBeNegative}`;
      let isValid = true;

      if (input.length === 0 || isNaN(input)) {
        this.addError(shouldBeNumberMessage);
        isValid = false;
      } else {
        this.removeError(shouldBeNumberMessage);
      }

      if (input && input < 0) {
        this.addError(cannotBeNegativeMessage);
        isValid = false;
      } else {
        this.removeError(cannotBeNegativeMessage);
      }

      return isValid;
    },
    notifyClose(event) {
      this.removeError(event);
    },
    addError(error) {
      if (!this.errors.includes(error)) {
        this.errors.push(error);
      }
    },
    removeError(error) {
      this.errors = this.errors.filter((_error) => _error != error);
    },
  },
});
