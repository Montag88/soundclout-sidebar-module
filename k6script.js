import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "10s", target: 10, rps: 1},
    { duration: "10s", target: 10, rps: 10 },
    { duration: "10s", target: 10, rps: 100 },
    { duration: "10s", target: 10, rps: 1000 },
    { duration: "10s", target: 50, rps: 1200 },
    { duration: "10s", target: 100, rps: 1400 }
  ]
};

export default function() {
  let res = http.get("http://localhost:3500/api/tracks");
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 200
  });
  // sleep(1);
};
