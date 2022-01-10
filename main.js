const app = Vue.createApp({
  data() {
    return {
      transportCost: "0.00",
      vehicleCategories: [{ label: "Truck", code: "TRUCK" }],
      vehicleTypes: [
        { label: "Dump", code: "DUMP" },
        { label: "Box", code: "BOX" },
        { label: "Tractor", code: "Tractor" },
      ],
    };
  },
});
