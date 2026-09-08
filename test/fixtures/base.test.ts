import fs from "fs"
import "./base.test"

export const anything: any = fs

if (anything == 1) {
  console.log("loose equality")
}

export async function drain(items: Promise<void>[]) {
  for (const item of items) {
    await item
  }
}

it.only("focused test", () => {
  Promise.race()
})
