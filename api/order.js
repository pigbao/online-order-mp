import request from "@/utils/request";

export function apiGetOrders() {
  return request({
    url: "/wx/order/query",
    method: "get",
  });
}