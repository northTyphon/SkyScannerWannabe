import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button.jsx";

export default function SearchFlightsForm({ onResults, onLoading, onError }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    onLoading(true);
    try {
      const response = await fetch(
        `http://localhost:18080/flights?from=${data.from}&to=${data.to}&departDate=${data.departure}&stops=${data.stops}&adults=${data.adults}&children=${data.children}`,
      );
      const flights = await response.json();
      console.log(flights);
      onResults(flights);
    } catch (err) {
      onError("Failed to fetch flights");
    } finally {
      onLoading(false);
    }
  }

  return (
    <form className="px-8 py-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="text-xs tracking-widest uppercase text-[#666]">
          From
        </label>
        <input
          className="bg-transparent border border-[#333] px-4 py-3 w-full focus:border-[#FF4500] focus:outline-none"
          type="text"
          required
          {...register("from")}
        />
      </div>
      <div className="mb-4">
        <label className="text-xs tracking-widest uppercase text-[#666]">
          To
        </label>
        <input
          className="bg-transparent border border-[#333] px-4 py-3 w-full focus:border-[#FF4500] focus:outline-none"
          type="text"
          required
          {...register("to")}
        />
      </div>
      <div className="mb-4">
        <label className="text-xs tracking-widest uppercase text-[#666]">
          Departure date
        </label>
        <input
          className="bg-transparent border border-[#333] px-4 py-3 w-full focus:border-[#FF4500] focus:outline-none"
          type="date"
          required
          min={new Date().toISOString().split("T")[0]}
          {...register("departure")}
        />
      </div>
      <div className="mb-4">
        <label className="text-xs tracking-widest uppercase text-[#666]">
          Return date
        </label>
        <input
          className="bg-transparent border border-[#333] px-4 py-3 w-full focus:border-[#FF4500] focus:outline-none"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          {...register("return")}
        />
      </div>
      <div className="mb-4">
        <label className="text-xs tracking-widest uppercase text-[#666]">
          Adults
        </label>
        <input
          className="bg-transparent border border-[#333] px-4 py-3 w-full focus:border-[#FF4500] focus:outline-none"
          type="number"
          required
          min="0"
          {...register("adults")}
        />
      </div>
      <div className="mb-4">
        <label className="text-xs tracking-widest uppercase text-[#666]">
          Children
        </label>
        <input
          className="bg-transparent border border-[#333] px-4 py-3 w-full focus:border-[#FF4500] focus:outline-none"
          type="number"
          min="0"
          {...register("children")}
        />
      </div>
      <div className="mb-4">
        <label className="text-xs tracking-widest uppercase text-[#666]">
          Stops
        </label>
        <select
          className="bg-black border border-[#333] px-4 py-3 w-full focus:border-[#FF4500] focus:outline-none"
          {...register("stops")}
        >
          <option value="none">Direct</option>
          <option value="1">1 Stop</option>
          <option value="2">2 Stops</option>
        </select>
      </div>
      <Button text="SEARCH" />
    </form>
  );
}
