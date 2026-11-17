"use client";
import RouteContainer from "@/components/common/container";
import { Button } from "@/components/ui/button";

function handleButtonClick() {
  alert("Button clicked!");
}

export default function Home() {
  return (
    <RouteContainer className="tw:text-red-500 tw:flex tw:justify-center tw:items-center tw:h-screen">
      <Button variant="filled" color="primary" size="xl" onClick={handleButtonClick}>
        Click me
      </Button>
    </RouteContainer>
  );
}
