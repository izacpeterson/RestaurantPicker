"use client";

export default function RestaurantCard({ restaurant }) {
  return (
    <div className="w-1/2 flex flex-col items-center p-4">
      <h2 className="text-2xl">
        {restaurant.name.split(" ")[0]}
        &nbsp;
        {restaurant.name.split(" ")[1]}
        &nbsp;
        {restaurant.name.split(" ")[2]}
      </h2>
      <div className="flex w-full justify-between">
        {/* <span>
          {
            //switch case based on price level
            (() => {
              switch (restaurant.price_level) {
                case 1:
                  return "$";
                case 2:
                  return "$$";
                case 3:
                  return "$$$";
                case 4:
                  return "$$$$";
                default:
                  return "N/A";
              }
            })()
          }
        </span>
        <span>
          {
            //switch case based on rating level

            (() => {
              switch (Math.round(restaurant.rating)) {
                case 1:
                  //emplty star emoji
                  return "⭐";
                case 2:
                  return "⭐⭐";
                case 3:
                  return "⭐⭐⭐";
                case 4:
                  return "⭐⭐⭐⭐";
                case 5:
                  return "⭐⭐⭐⭐⭐";
                default:
                  return "N/A";
              }
            })()
          }
        </span> */}
        <span>
          <button className="btn btn-success">
            <span className="material-symbols-outlined">done</span>
          </button>
        </span>
        <span>
          <button className="btn btn-error">
            <span className="material-symbols-outlined">close</span>
          </button>
        </span>
      </div>
    </div>
  );
}
