import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 300,
  duration: "30s",
  rps: 4000
};

export default function() {
  let res = http.get("http://localhost:3500/api/tracks");
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 200
  });
  // sleep(1);
};
