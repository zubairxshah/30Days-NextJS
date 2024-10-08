import react from "react";
import UnitConverterComponent from "@/app/components/unit-converter";
import MeasurementConverter from "@/app/components/test";
export default function UnitConverterPage() {
  return (
    <div>
      <h1>Unit Converter</h1>
      <UnitConverterComponent />
      <MeasurementConverter/>
    </div>
  );
}
