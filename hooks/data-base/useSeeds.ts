import { useEffect } from "react";
import { useDatabase } from "./useDatabase";
import seeds from "@/db/seeds";
import { useFirstLaunch } from "./useFirstLaunch";

export function useSeeds() {
  const { db, sqlite } = useDatabase();
  const isFirstLaunch = useFirstLaunch();

  useEffect(() => {
    const seedIfNeeded = async () => {
      if (isFirstLaunch) {
        try {
          console.log("Running initial database seeding...");
          await seeds(db);
          console.log("Database seeding completed");
        } catch (error) {
          console.error("Database seeding failed:", error);
        }
      }
    };

    seedIfNeeded();
  }, [isFirstLaunch, db]);

  //return { db, sqlite };
}
