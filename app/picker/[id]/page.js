"use client";
import { useState, useEffect } from "react";
import { uploadSelected } from "@/app/functions/firebase";
import { useRouter } from "next/navigation";

function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function getNearby() {
  let location = await getLocation();
  let response = await fetch(`/api/getSuggestion?lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
  let data = await response.json();
  // let data = localStorage.getItem("nearby");
  // data = JSON.parse(data);
  //save data to localstorage
  localStorage.setItem("nearby", JSON.stringify(data));
  return data;
}

function processSelected(id, nearby) {
  let selected = nearby.filter((item) => item.selected);
  //filter out all object properties except name and place_id
  selected = selected.map((item) => {
    return { name: item.name, place_id: item.place_id };
  });
  uploadSelected(id, selected);
  return selected;
}

export default function Picker({ params }) {
  const router = useRouter();

  const [nearby, setNearby] = useState([]);
  useEffect(() => {
    getNearby().then((data) => {
      let results = data.results;
      results = results.map((item) => {
        item.selected = false;
        return item;
      });
      console.log(results);
      setNearby(data.results);
    });
  }, []);
  return (
    <main className="flex flex-col items-center">
      <p className="text-center text-xl">First, click the button bellow to share with your partner</p>
      <button
        onClick={() => {
          //web share api
          if (navigator.share) {
            navigator
              .share({
                title: "Restaurants Nearby",
                text: "Check out these restaurants nearby",
                url: window.location.href,
              })
              .then(() => console.log("Successful share"))
              .catch((error) => console.log("Error sharing", error));
          }
        }}
        className="btn btn-primary m-4"
      >
        Share
      </button>
      <h2 className="text-center text-2xl pt-4">Restaurants Nearby</h2>
      <p className="text-center text-xs italic pb-4">Tap/click a restaurant to select</p>
      <ul className="flex flex-col items-center">
        {nearby.map((item) => (
          <li
            key={item.name}
            onClick={() => {
              item.selected = !item.selected;
              setNearby([...nearby]);
            }}
            className={item.selected ? "bg-success text-success-content p-2 m-2" : " p-2 m-2"}
          >
            {item.name}
            {/* <RestaurantCard key={item.name} restaurant={item} /> */}
          </li>
        ))}
        <button
          onClick={() => {
            processSelected(params.id, nearby);
            router.push(`/picker/${params.id}/results`);
          }}
          className="btn btn-primary m-4"
        >
          Finish
        </button>
      </ul>
      {/* <pre>{JSON.stringify(yes, null, 2)}</pre> */}
    </main>
  );
}
